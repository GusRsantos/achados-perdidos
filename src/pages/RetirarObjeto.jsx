import React from 'react';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useNavigate, useParams } from 'react-router-dom';
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
      <Text style={estilosPDF.titulo}>
        TERMO DE RESPONSABILIDADE PARA RETIRADA DE OBJETO
      </Text>
      <Text style={estilosPDF.texto}>
        {`
Eu, ____________________________________________________________, portador do CPF nº __________________________, e RG nº __________________________, residente e domiciliado no endereço __________________________________________________________, telefone para contato (_____) __________________________, declaro, sob as penas da lei, que:

1. Estou retirando o objeto descrito abaixo, devidamente identificado como pertencente ao sistema de Achados e Perdidos:

   - Descrição do Objeto: ______________________________________________________
   - Data de Retirada: ___________________________________________________________
   - Identificação/Protocolo: ____________________________________________________

2. Declaro estar ciente de que o objeto em questão foi identificado como sendo de minha responsabilidade, com base nas informações fornecidas previamente e/ou documentos apresentados.

3. Comprometo-me a verificar a integridade e autenticidade do objeto no ato da retirada e exonero o sistema de Achados e Perdidos de qualquer responsabilidade futura sobre o estado do mesmo após a retirada.

4. Reconheço que qualquer tentativa de fraude, falsa declaração, ou uso indevido das informações prestadas neste termo poderá acarretar a aplicação das penalidades previstas nos artigos 171 e 299 do Código Penal, conforme descrito abaixo:

   Art. 171 (Estelionato) – Obter, para si ou para outrem, vantagem ilícita, em prejuízo alheio, induzindo ou mantendo alguém em erro, mediante artifício, ardil, ou qualquer outro meio fraudulento.  
   Pena: reclusão de 1 (um) a 5 (cinco) anos e multa.

   Art. 299 (Falsidade ideológica) – Omitir, em documento público ou particular, declaração que nele deveria constar, ou nele inserir declaração falsa ou diversa da que devia ser escrita, com o fim de prejudicar direito, criar obrigação, ou alterar a verdade sobre fato juridicamente relevante.  
   Pena: reclusão de 1 (um) a 5 (cinco) anos e multa, se o documento é público, e reclusão de 1 (um) a 3 (três) anos, se o documento é particular.

5. Declaro que todas as informações prestadas são verdadeiras e assumo integral responsabilidade por quaisquer implicações legais decorrentes.

Local e Data: _________________________________________________________________  
Assinatura do Declarante: _______________________________________________________
`}
      </Text>
    </Page>
  </Document>
);

const RetirarObjeto = () => {
  const navigate = useNavigate();
   
    const handlePDFClick = () => {
      // Apenas lida com o clique para download do PDF, sem atualização de status
      console.log('PDF gerado para download.');
    };
    
  const handleFinalizar = async () => { 
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
          onClick={handlePDFClick}
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
