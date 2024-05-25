function exportCsvCustomDelimiterNoQuotes() {
  // Planilha atual
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Pega os dados da planilha
  var data = sheet.getDataRange().getValues();
  
  // Cria um array para guardar as linhas do CSV
  var csvData = [];
  
  // Processa os dados para o formato CSV
  data.forEach(function(row) {
    var csvRow = [];
    row.forEach(function(cell) {
      // Adiciona a célula ao csvRow sem aspas adicionais
      csvRow.push(String(cell));
    });
    csvData.push(csvRow.join(';')); // Junta as células com ponto e vírgula
  });
  
  // Converte o array em uma string CSV
  var csvString = csvData.join('\n');
  
  // Cria um arquivo temporário com o conteúdo CSV na raiz do Drive
  var fileId = DriveApp.createFile('exported_data_no_quotes.csv', csvString, MimeType.PLAIN_TEXT).getId();
  
  // Mostra uma caixa de diálogo com o link para download do arquivo
  var downloadUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
  SpreadsheetApp.getUi().alert('Download your CSV file here: ' + downloadUrl);
}
