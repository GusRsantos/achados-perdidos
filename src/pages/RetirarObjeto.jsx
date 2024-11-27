import React from 'react';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
import styles from './RetirarObjeto.module.css';

// Estilos para o PDF
const estilosPDF = StyleSheet.create({
  pagina: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  texto: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  titulo: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Componente do PDF
const TermoResponsabilidade = () => (
  <Document>
    <Page size="A4" style={estilosPDF.pagina}>
      <Text style={estilosPDF.titulo}>TERMO DE RESPONSABILIDADE</Text>
      <Text style={estilosPDF.texto}>
        {`Eu,__________________________________________________________
_________________,CPF nº_________________________ RG nº__________________
Órgão Exped.____________, telefone (_____)___________________, na falta de
documentos para comprovação de residência, em conformidade com o disposto na Lei
7.115, de 29 de agosto de 1983, DECLARO para os devidos fins, sob penas da Lei, ser
residente e domiciliado no endereço ____________________________________________
_________________________________________________________________________.

Por ser verdade, firmo a presente declaração para que produza os efeitos legais, ciente
de que a falsidade de seu conteúdo pode implicar na imputação de sanções civis,
administrativas, bem como na sanção penal prevista no art. 299 do Código Penal,
conforme transcrição abaixo:

Art. 299 – Omitir, em documento público ou particular, declaração que
nele deveria constar, ou nele inserir ou fazer inserir declaração falsa ou
diversa da que devia ser escrita, com o fim de prejudicar direito, criar
obrigação ou alterar a verdade sobre fato juridicamente relevante.
Pena: reclusão de 1 (um) a 5 (cinco) anos e multa, se o documento é
público e reclusão de 1 (um) a 3 (três) anos, se o documento é particular.

___________________________________, ________/________/__________.
Local                                                                                                              Data

Assinatura do Declarante: ___________________________________________________`}
      </Text>
    </Page>
  </Document>
);

const RetirarObjeto = () => {
  const navigate = useNavigate();

  const handleFinalizar = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Tela de Retirada</h1>
      <div className={styles.conteudo}>
        <PDFDownloadLink
          document={<TermoResponsabilidade />}
          fileName="termo_de_responsabilidade.pdf"
          className={styles.linkPDF}
        >
          {({ loading }) =>
            loading ? 'Carregando documento...' : 'Termo de Responsabilidade.pdf'
          }
        </PDFDownloadLink>
      </div>
      <div className={styles.containerBotao}>
        <button className={styles.botaoFinalizar} onClick={handleFinalizar}>
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default RetirarObjeto;