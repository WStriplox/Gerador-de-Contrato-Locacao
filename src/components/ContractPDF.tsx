import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 45,
    paddingRight: 45,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.35,
  },
  title: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    marginBottom: 2,
  },
  clause: {
    marginBottom: 5,
    textAlign: 'justify',
  },
  signatures: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
    alignItems: 'center',
  },
  signatureLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  signatureName: {
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  }
});

export interface ContractData {
  locador: {
    nome: string;
    rg: string;
    cpf: string;
    estadoCivil: string;
    telefone: string;
    endereco: string;
  };
  locatario: {
    nome: string;
    cpf: string;
    telefone: string;
    estadoCivil: string;
  };
  imovel: {
    endereco: string;
  };
  locacao: {
    duracaoMeses: string;
    dataInicio: string;
    dataTermino: string;
    finalidade: string;
    quantidadeMoradores: string;
    vencimentoDia: string;
    valorMensal: string;
    cidade: string;
  };
}

interface ContractPDFProps {
  data: ContractData;
}

export const ContractPDF: React.FC<ContractPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Contrato de Locação</Text>

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Locador: </Text>
            {data.locador.nome} – C.I {data.locador.rg} – CPF – {data.locador.cpf} Estado civil – {data.locador.estadoCivil} – Tel {data.locador.telefone} Endereço: {data.locador.endereco}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Locatário: </Text>
            {data.locatario.nome} - CPF {data.locatario.cpf} - Tel: {data.locatario.telefone} - Estado civil: {data.locatario.estadoCivil}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Imóvel: </Text>
            {data.imovel.endereco}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>LOCAÇÃO: </Text>{data.locacao.duracaoMeses} (meses)
            <Text style={styles.bold}>   INÍCIO: </Text>{data.locacao.dataInicio}
            <Text style={styles.bold}>   TÉRMINO: </Text>{data.locacao.dataTermino}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>FINALIDADE: </Text>{data.locacao.finalidade}
            <Text style={styles.bold}>   QTD. MORADORES: </Text>{data.locacao.quantidadeMoradores}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>VENCIMENTO: </Text>{data.locacao.vencimentoDia}
            <Text style={styles.bold}>   VALOR MENSAL DA LOCAÇÃO: </Text>{data.locacao.valorMensal}
          </Text>
        </View>

        <Text style={styles.clause}>
          <Text style={styles.bold}>1°) VIGÊNCIA: </Text>
          A VIGÊNCIA DA LOCAÇÃO SERÁ PELO PERÍODO ESTABELECIDO NO PREÂMBULO DESTE INSTRUMENTO. O LOCATÁRIO DEVE RESTITUIR O IMÓVEL NA DATA DE TÉRMINO, DA MESMA MANEIRA QUE O ENCONTROU, INDEPENDENTEMENTE DE NOTIFICAÇÃO JUDICIAL, INCLUINDO AS DESPESAS DE ÁGUA E LUZ.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>2°) ALUGUEL: </Text>
          O ALUGUEL MENSAL É O PACTUADO NO PREÂMBULO DESTE CONTRATO E SERÁ REAJUSTADO DE ACORDO COM O IGP-M (ÍNDICE GERAL DE PREÇOS DO MERCADO), PUBLICADO PELA FUNDAÇÃO GETÚLIO VARGAS.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>3°) MANUTENÇÃO: </Text>
          O LOCATÁRIO, SALVO AS OBRAS QUE IMPORTEM NA SEGURANÇA DO IMÓVEL, OBRIGA-SE POR TODAS AS OUTRAS, DEVENDO MANTER O IMÓVEL LOCADO EM BOAS CONDIÇÕES DE HIGIENE E LIMPEZA, COM OS APARELHOS SANITÁRIOS E DE ILUMINAÇÃO, PINTURAS, TELHADOS, VIDRAÇAS, MÁRMORES, FECHADURAS, TORNEIRAS, PIAS, BANHEIROS, RALOS E DEMAIS ACESSÓRIOS EM PERFEITO ESTADO DE CONSERVAÇÃO E FUNCIONAMENTO PARA ASSIM RESTITUÍ-LOS QUANDO FINDO O CONTRATO. QUALQUER OBRA NECESSÁRIA FICARÁ DESDE JÁ INCORPORADA AO IMÓVEL. ATENÇÃO! ESTÁ PROIBIDO FAZER ALTERAÇÕES NO IMÓVEL, COMO FUROS NA ESTRUTURA DO MESMO.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>4°) MODIFICAÇÕES: </Text>
          O LOCATÁRIO OBRIGA-SE A SATISFAZER AS EXIGÊNCIAS DOS PODERES PÚBLICOS A QUE DER CAUSA E A NÃO FAZER MODIFICAÇÕES OU TRANSFORMAÇÕES NO IMÓVEL, SEM AUTORIZAÇÃO POR ESCRITO DO LOCADOR.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>5°) VISITAS: </Text>
          O LOCATÁRIO, DESDE JÁ, FACULTA AO LOCADOR OU SEU REPRESENTANTE VISTORIAR O IMÓVEL LOCADO, QUANDO FOR CONVENIENTE.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>6°) TRANSFERÊNCIA: </Text>
          O LOCATÁRIO NÃO PODERÁ TRANSFERIR ESTE CONTRATO NEM SUBLOCAR OU EMPRESTAR O IMÓVEL, NO TODO OU EM PARTE, SEM OBTER CONSENTIMENTO POR ESCRITO DO LOCADOR.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>7°) CONVIVÊNCIA: </Text>
          O LOCATÁRIO TEM A OBRIGAÇÃO DE RESPEITAR AS REGRAS DE BOA CONVIVÊNCIA DO CONDOMÍNIO. <Text style={styles.bold}>8°) FORO: </Text>
          PARA TODAS AS QUESTÕES RESULTANTES DESTE CONTRATO, FICA ELEITO O FORO DA SITUAÇÃO DO IMÓVEL, QUAISQUER SEJAM OS DOMICÍLIOS DOS CONTRATANTES.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>9°) – PROIBIÇÃO DE SUBSTITUIÇÃO OU ADIÇÃO DE MORADORES</Text>{'\n'}
          FICA EXPRESSAMENTE VEDADO AO LOCATÁRIO PERMITIR QUE TERCEIROS NÃO CONSTANTES NESTE CONTRATO PASSEM A RESIDIR NO IMÓVEL, SEJA DE FORMA TEMPORÁRIA OU PERMANENTE, SEM A PRÉVIA E EXPRESSA AUTORIZAÇÃO POR ESCRITO DO LOCADOR. O DESCUMPRIMENTO DESTA CLÁUSULA PODERÁ ACARRETAR PENALIDADES PREVISTAS NESTE CONTRATO, INCLUINDO A RESCISÃO IMEDIATA DO MESMO.
        </Text>

        <Text style={styles.clause}>
          <Text style={styles.bold}>10°) MULTA: </Text>
          FICA ESTIPULADA A MULTA DE 10% (DEZ POR CENTO), NA QUAL INCORRERÁ A PARTE QUE INFRINGIR QUALQUER CLÁUSULA DESTE CONTRATO, COM A FACULDADE PARA A PARTE INOCENTE DE PODER CONSIDERAR SIMULTANEAMENTE RESCINDIDA A LOCAÇÃO, INDEPENDENTEMENTE DE QUALQUER FORMALIDADE.{'\n'}
          E, POR ASSIM TEREM CONTRATADO, ASSINAM O PRESENTE EM 02 (DUAS) VIAS, NA PRESENÇA DAS TESTEMUNHAS ABAIXO, A FIM DE DAR CUMPRIMENTO ÀS EXIGÊNCIAS E FORMALIDADES LEGAIS.
        </Text>

        <View style={styles.signatures}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{data.locador.nome || 'Locador'}</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{data.locatario.nome || 'Locatário'}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>{(data.locacao.cidade || 'CIDADE').toUpperCase()}, {data.locacao.dataInicio}</Text>
        </View>
      </Page>
    </Document>
  );
};
