import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ContractPDF, ContractData } from './components/ContractPDF';
import { FileText, Download, User, Home, Calendar, FileSignature, Save, Upload, Database, FileSpreadsheet, Link as LinkIcon, Info, ClipboardPaste } from 'lucide-react';

const defaultLocadorPresets: any[] = [];

const defaultImovelPresets: any[] = [];

const estadoCivilOptions = [
  { value: 'Solteiro(a)', label: 'Solteiro(a)' },
  { value: 'Casado(a)', label: 'Casado(a)' },
  { value: 'Divorciado(a)', label: 'Divorciado(a)' },
  { value: 'Viúvo(a)', label: 'Viúvo(a)' },
  { value: 'União Estável', label: 'União Estável' },
];

const initialData: ContractData = {
  locador: { nome: '', rg: '', cpf: '', estadoCivil: '', telefone: '', endereco: '' },
  locatario: { nome: '', cpf: '', telefone: '', estadoCivil: '' },
  imovel: { endereco: '' },
  locacao: { duracaoMeses: '', dataInicio: '', dataTermino: '', finalidade: 'PARA FINS RESIDENCIAIS', quantidadeMoradores: '', vencimentoDia: '', valorMensal: '', cidade: '' }
};

interface InputFieldProps {
  label: string;
  section: keyof ContractData;
  field: string;
  placeholder?: string;
  type?: string;
  data: ContractData;
  handleChange: (section: keyof ContractData, field: string, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, section, field, placeholder, type = "text", data, handleChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <input
      type={type}
      className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      placeholder={placeholder}
      value={(data[section] as any)[field]}
      onChange={(e) => handleChange(section, field, e.target.value)}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  section: keyof ContractData;
  field: string;
  options: { value: string; label: string }[];
  data: ContractData;
  handleChange: (section: keyof ContractData, field: string, value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, section, field, options, data, handleChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <select
      className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      value={(data[section] as any)[field]}
      onChange={(e) => handleChange(section, field, e.target.value)}
    >
      <option value="" disabled>Selecione...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const TenantForm = () => {
  const [data, setData] = useState({ nome: '', cpf: '', telefone: '', estadoCivil: '', valorMensal: '', vencimentoDia: '', quantidadeMoradores: '' });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!data.nome || !data.cpf) {
      alert("Por favor, preencha pelo menos Nome e CPF.");
      return;
    }
    
    setShowModal(true);
  };

  const confirmAndSend = () => {
    // Create a full CSV row compatible with the main app's import function
    const csvHeaders = [
      'locador_nome', 'locador_rg', 'locador_cpf', 'locador_estadoCivil', 'locador_telefone', 'locador_endereco',
      'locatario_nome', 'locatario_cpf', 'locatario_telefone', 'locatario_estadoCivil',
      'imovel_endereco',
      'locacao_duracaoMeses', 'locacao_dataInicio', 'locacao_dataTermino', 'locacao_finalidade', 'locacao_quantidadeMoradores', 'locacao_vencimentoDia', 'locacao_valorMensal', 'locacao_cidade'
    ].join(',');
    
    const row = [
      '', '', '', '', '', '', // locador (empty)
      data.nome, data.cpf, data.telefone, data.estadoCivil, // locatario
      '', // imovel (empty)
      '', '', '', '', data.quantidadeMoradores, data.vencimentoDia, data.valorMensal, '' // locacao
    ].map(val => `"${(val || '').replace(/"/g, '""')}"`).join(',');

    const csvText = `${csvHeaders}\n${row}`;
    const message = `Olá! Aqui estão meus dados para o contrato de locação em formato CSV. Você pode salvar este texto como um arquivo .csv e importar no sistema:\n\n${csvText}`;
    
    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/5531973136189?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Dados do Locatário</h1>
          <p className="mt-2 text-slate-600">Preencha seus dados abaixo para enviar ao locador.</p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Nome Completo</label>
            <input type="text" className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ex: João da Silva" value={data.nome} onChange={e => handleChange('nome', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Estado Civil</label>
            <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={data.estadoCivil} onChange={e => handleChange('estadoCivil', e.target.value)}>
              <option value="" disabled>Selecione...</option>
              {estadoCivilOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">CPF</label>
            <input type="text" className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ex: 123.456.789-00" value={data.cpf} onChange={e => handleChange('cpf', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Telefone</label>
            <input type="text" className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ex: (11) 99999-9999" value={data.telefone} onChange={e => handleChange('telefone', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Valor do Aluguel Combinado</label>
            <input type="text" className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ex: R$ 1.500,00" value={data.valorMensal} onChange={e => handleChange('valorMensal', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Data de Vencimento</label>
            <input type="text" className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ex: Todo dia 05" value={data.vencimentoDia} onChange={e => handleChange('vencimentoDia', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Quantidade de Moradores</label>
            <input type="number" className="px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ex: 2" value={data.quantidadeMoradores} onChange={e => handleChange('quantidadeMoradores', e.target.value)} />
          </div>

          <button onClick={handleSubmit} className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-sm transition-colors">
            Enviar pelo WhatsApp
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Aviso Importante</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Após enviar os dados pelo WhatsApp, por favor, lembre-se de <strong>anexar a foto de um documento de identidade válido</strong> (RG ou CNH) na conversa.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAndSend}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Entendi, Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const isTenantMode = urlParams.get('mode') === 'tenant';

  if (isTenantMode) {
    return <TenantForm />;
  }

  const [data, setData] = useState<ContractData>(initialData);
  const [locadorPresets, setLocadorPresets] = useState(defaultLocadorPresets);
  const [imovelPresets, setImovelPresets] = useState(defaultImovelPresets);
  const [savedContracts, setSavedContracts] = useState<Record<string, ContractData>>({});
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedCSV, setPastedCSV] = useState('');

  useEffect(() => {
    const savedLocadores = localStorage.getItem('locadorPresets');
    if (savedLocadores) setLocadorPresets(JSON.parse(savedLocadores));
    const savedImoveis = localStorage.getItem('imovelPresets');
    if (savedImoveis) setImovelPresets(JSON.parse(savedImoveis));
    const saved = localStorage.getItem('savedContracts');
    if (saved) setSavedContracts(JSON.parse(saved));
  }, []);

  const handleSaveLocal = () => {
    const name = prompt('Nome para salvar este contrato (ex: Contrato João):');
    if (name) {
      const updated = { ...savedContracts, [name]: data };
      setSavedContracts(updated);
      localStorage.setItem('savedContracts', JSON.stringify(updated));
      alert('Contrato salvo localmente com sucesso!');
    }
  };

  const handleLoadLocal = (name: string) => {
    if (name && savedContracts[name]) {
      setData(savedContracts[name]);
    }
  };

  const csvHeaders = [
    'locador_nome', 'locador_rg', 'locador_cpf', 'locador_estadoCivil', 'locador_telefone', 'locador_endereco',
    'locatario_nome', 'locatario_cpf', 'locatario_telefone', 'locatario_estadoCivil',
    'imovel_endereco',
    'locacao_duracaoMeses', 'locacao_dataInicio', 'locacao_dataTermino', 'locacao_finalidade', 'locacao_quantidadeMoradores', 'locacao_vencimentoDia', 'locacao_valorMensal', 'locacao_cidade'
  ];

  const generateCSV = (dataToExport: ContractData) => {
    const row = [
      dataToExport.locador.nome, dataToExport.locador.rg, dataToExport.locador.cpf, dataToExport.locador.estadoCivil, dataToExport.locador.telefone, dataToExport.locador.endereco,
      dataToExport.locatario.nome, dataToExport.locatario.cpf, dataToExport.locatario.telefone, dataToExport.locatario.estadoCivil,
      dataToExport.imovel.endereco,
      dataToExport.locacao.duracaoMeses, dataToExport.locacao.dataInicio, dataToExport.locacao.dataTermino, dataToExport.locacao.finalidade, dataToExport.locacao.quantidadeMoradores, dataToExport.locacao.vencimentoDia, dataToExport.locacao.valorMensal, dataToExport.locacao.cidade
    ].map(val => `"${(val || '').replace(/"/g, '""')}"`).join(',');
    return `${csvHeaders.join(',')}\n${row}`;
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleExportCSV = () => downloadCSV(generateCSV(data), 'contrato.csv');
  const handleDownloadTemplate = () => downloadCSV(generateCSV(initialData), 'modelo_contrato.csv');

  const processCSVText = (text: string) => {
    const lines = text.split('\n');
    if (lines.length > 1) {
      // Find the first line that contains actual data (usually lines[1])
      // WhatsApp sometimes adds empty lines or we might have headers
      const dataLine = lines.find((line, index) => index > 0 && line.trim().length > 10) || lines[1];
      
      if (!dataLine) {
        alert('Formato de CSV inválido ou vazio.');
        return;
      }

      const row = dataLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/^"|"$/g, '').replace(/""/g, '"'));
      if (row.length >= 18) {
        setData(prev => ({
          locador: { 
            nome: row[0] || prev.locador.nome, 
            rg: row[1] || prev.locador.rg, 
            cpf: row[2] || prev.locador.cpf, 
            estadoCivil: row[3] || prev.locador.estadoCivil, 
            telefone: row[4] || prev.locador.telefone, 
            endereco: row[5] || prev.locador.endereco 
          },
          locatario: { 
            nome: row[6] || prev.locatario.nome, 
            cpf: row[7] || prev.locatario.cpf, 
            telefone: row[8] || prev.locatario.telefone, 
            estadoCivil: row[9] || prev.locatario.estadoCivil 
          },
          imovel: { 
            endereco: row[10] || prev.imovel.endereco 
          },
          locacao: { 
            duracaoMeses: row[11] || prev.locacao.duracaoMeses, 
            dataInicio: row[12] || prev.locacao.dataInicio, 
            dataTermino: row[13] || prev.locacao.dataTermino, 
            finalidade: row[14] || prev.locacao.finalidade, 
            quantidadeMoradores: row[15] || prev.locacao.quantidadeMoradores, 
            vencimentoDia: row[16] || prev.locacao.vencimentoDia, 
            valorMensal: row[17] || prev.locacao.valorMensal,
            cidade: row[18] || prev.locacao.cidade
          }
        }));
        alert('Dados importados com sucesso!');
        setShowPasteModal(false);
        setPastedCSV('');
      } else {
        alert('Formato de CSV inválido. Use o modelo fornecido.');
      }
    } else {
      alert('Formato de CSV inválido. Use o modelo fornecido.');
    }
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processCSVText(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveLocador = () => {
    if (!data.locador.nome) return alert('Preencha o nome do locador para salvar.');
    const newPresets = [...locadorPresets, data.locador];
    setLocadorPresets(newPresets);
    localStorage.setItem('locadorPresets', JSON.stringify(newPresets));
    alert('Locador salvo com sucesso!');
  };

  const handleSaveImovel = () => {
    if (!data.imovel.endereco) return alert('Preencha o endereço do imóvel para salvar.');
    const newPresets = [...imovelPresets, data.imovel];
    setImovelPresets(newPresets);
    localStorage.setItem('imovelPresets', JSON.stringify(newPresets));
    alert('Imóvel salvo com sucesso!');
  };

  const handleLoadLocador = (index: string) => {
    if (index === "") return;
    const preset = locadorPresets[Number(index)];
    setData(prev => ({ ...prev, locador: { ...preset } }));
  };

  const handleLoadImovel = (index: string) => {
    if (index === "") return;
    const preset = imovelPresets[Number(index)];
    setData(prev => ({ ...prev, imovel: { ...preset } }));
  };

  const handleChange = (section: keyof ContractData, field: string, value: string) => {
    setData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section as keyof ContractData],
          [field]: value
        }
      };

      if (section === 'locacao' && field === 'dataInicio') {
        const match = value.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
        if (match) {
          const day = parseInt(match[1], 10);
          const month = parseInt(match[2], 10) - 1;
          const year = parseInt(match[3], 10);
          const date = new Date(year, month, day);
          if (!isNaN(date.getTime())) {
            date.setFullYear(date.getFullYear() + 1);
            const newDay = String(date.getDate()).padStart(2, '0');
            const newMonth = String(date.getMonth() + 1).padStart(2, '0');
            const newYear = date.getFullYear();
            const separator = value.includes('/') ? '/' : '-';
            newData.locacao.dataTermino = `${newDay}${separator}${newMonth}${separator}${newYear}`;
          }
        }
      }

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <FileSignature className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gerador de Contrato de Locação</h1>
          <p className="mt-2 text-slate-600">Preencha os dados essenciais abaixo para gerar seu contrato em PDF instantaneamente.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <button onClick={handleSaveLocal} className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Database className="w-4 h-4 text-indigo-500" /> Salvar no Navegador
          </button>
          
          {Object.keys(savedContracts).length > 0 && (
            <select 
              onChange={(e) => handleLoadLocal(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              value=""
            >
              <option value="" disabled>Carregar contrato salvo...</option>
              {Object.keys(savedContracts).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          )}

          <div className="hidden md:block w-px h-8 bg-slate-200 mx-1"></div>

          <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" /> Exportar CSV
          </button>
          
          <button onClick={handleDownloadTemplate} className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <Download className="w-4 h-4 text-blue-500" /> Modelo CSV
          </button>

          <button onClick={() => {
            const link = `${window.location.origin}${window.location.pathname}?mode=tenant`;
            navigator.clipboard.writeText(link);
            alert('Link copiado! Envie este link para o locatário preencher os dados.');
          }} className="flex items-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium transition-colors border border-indigo-200">
            <LinkIcon className="w-4 h-4" /> Link p/ Locatário
          </button>

          <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 cursor-pointer">
            <Upload className="w-4 h-4 text-amber-500" /> Importar CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>

          <button onClick={() => setShowPasteModal(true)} className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
            <ClipboardPaste className="w-4 h-4 text-orange-500" /> Colar Dados
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-10">
            
            {/* Locador Section */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-semibold text-slate-800">Dados do Locador</h2>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="text-sm px-3 py-1.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => handleLoadLocador(e.target.value)}
                    value=""
                  >
                    <option value="" disabled>Carregar predefinição...</option>
                    {locadorPresets.map((p, i) => (
                      <option key={i} value={i}>{p.nome}</option>
                    ))}
                  </select>
                  <button 
                    onClick={handleSaveLocador}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-medium transition-colors"
                    title="Salvar dados atuais como nova predefinição"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField data={data} handleChange={handleChange} label="Nome Completo" section="locador" field="nome" placeholder="Ex: João da Silva" />
                <SelectField data={data} handleChange={handleChange} label="Estado Civil" section="locador" field="estadoCivil" options={estadoCivilOptions} />
                <InputField data={data} handleChange={handleChange} label="C.I. (RG)" section="locador" field="rg" placeholder="Ex: MG1234567" />
                <InputField data={data} handleChange={handleChange} label="CPF" section="locador" field="cpf" placeholder="Ex: 111.222.333-44" />
                <InputField data={data} handleChange={handleChange} label="Telefone" section="locador" field="telefone" placeholder="Ex: (11) 99999-9999" />
                <div className="md:col-span-2">
                  <InputField data={data} handleChange={handleChange} label="Endereço Completo" section="locador" field="endereco" placeholder="Ex: Rua das Flores, 123 - Centro" />
                </div>
              </div>
            </section>

            {/* Locatário Section */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <User className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-semibold text-slate-800">Dados do Locatário</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField data={data} handleChange={handleChange} label="Nome Completo" section="locatario" field="nome" placeholder="Ex: Maria Souza" />
                <SelectField data={data} handleChange={handleChange} label="Estado Civil" section="locatario" field="estadoCivil" options={estadoCivilOptions} />
                <InputField data={data} handleChange={handleChange} label="CPF" section="locatario" field="cpf" placeholder="Ex: 555.666.777-88" />
                <InputField data={data} handleChange={handleChange} label="Telefone" section="locatario" field="telefone" placeholder="Ex: (11) 98888-8888" />
              </div>
            </section>

            {/* Imóvel Section */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-semibold text-slate-800">Dados do Imóvel</h2>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="text-sm px-3 py-1.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onChange={(e) => handleLoadImovel(e.target.value)}
                    value=""
                  >
                    <option value="" disabled>Carregar predefinição...</option>
                    {imovelPresets.map((p, i) => (
                      <option key={i} value={i}>{p.endereco.substring(0, 30)}...</option>
                    ))}
                  </select>
                  <button 
                    onClick={handleSaveImovel}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg font-medium transition-colors"
                    title="Salvar dados atuais como nova predefinição"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <InputField data={data} handleChange={handleChange} label="Endereço do Imóvel Locado" section="imovel" field="endereco" placeholder="Ex: Rua arruda N° 116 Cs - Bairro São João - Betim/MG - CEP 32655610" />
              </div>
            </section>

            {/* Locação Section */}
            <section>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-slate-800">Condições da Locação</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField data={data} handleChange={handleChange} label="Duração (meses)" section="locacao" field="duracaoMeses" placeholder="Ex: 12" type="number" />
                <InputField data={data} handleChange={handleChange} label="Data de Início" section="locacao" field="dataInicio" placeholder="Ex: 08-11-2024" />
                <InputField data={data} handleChange={handleChange} label="Data de Término" section="locacao" field="dataTermino" placeholder="Ex: 08-11-2025" />
                <div className="md:col-span-2">
                  <SelectField 
                    data={data} 
                    handleChange={handleChange} 
                    label="Finalidade" 
                    section="locacao" 
                    field="finalidade" 
                    options={[
                      { value: 'PARA FINS RESIDENCIAIS', label: 'Residencial' },
                      { value: 'PARA FINS COMERCIAIS', label: 'Comercial' }
                    ]} 
                  />
                </div>
                <InputField data={data} handleChange={handleChange} label="Qtd. Moradores" section="locacao" field="quantidadeMoradores" placeholder="Ex: 2" type="number" />
                <InputField data={data} handleChange={handleChange} label="Vencimento" section="locacao" field="vencimentoDia" placeholder="Ex: Todo dia 05" />
                <InputField data={data} handleChange={handleChange} label="Valor Mensal" section="locacao" field="valorMensal" placeholder="Ex: R$ 1.500,00" />
                <InputField data={data} handleChange={handleChange} label="Cidade" section="locacao" field="cidade" placeholder="Ex: São Paulo/SP" />
              </div>
            </section>

          </div>
          
          <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              O contrato será gerado exatamente no modelo padrão, com os dados preenchidos acima.
            </p>
            
            <PDFDownloadLink 
              document={<ContractPDF data={data} />} 
              fileName={`Contrato_Locacao_${data.locatario.nome.replace(/\s+/g, '_') || 'Novo'}.pdf`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {({ loading }) => (
                <>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gerando PDF...
                    </span>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Baixar Contrato em PDF
                    </>
                  )}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      {/* Paste CSV Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <ClipboardPaste className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Colar Dados do WhatsApp</h3>
            </div>
            <p className="text-slate-600 mb-4 text-sm">
              Cole abaixo o texto completo que você recebeu do locatário (incluindo o cabeçalho e os dados).
            </p>
            <textarea
              className="w-full h-48 p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-xs text-slate-700 mb-4"
              placeholder={`locador_nome,locador_rg,locador_cpf...\n"","","","","","","João Silva","19981576590"...`}
              value={pastedCSV}
              onChange={(e) => setPastedCSV(e.target.value)}
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowPasteModal(false);
                  setPastedCSV('');
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => processCSVText(pastedCSV)}
                className="px-4 py-2 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors"
              >
                Importar Dados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
