function exportCsvCustomDelimiterNoQuotes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getDisplayValues();

  var csvString = data.map(function(row) {
    return row.map(function(cell) {
      return String(cell);
    }).join(';');
  }).join('\n');

  var html = HtmlService.createHtmlOutput(
    '<html><body><script>' +
    'const content = ' + JSON.stringify(csvString) + ';' +
    'const blob = new Blob(["\\uFEFF" + content], { type: "text/csv;charset=utf-8;" });' +
    'const url = URL.createObjectURL(blob);' +
    'const a = document.createElement("a");' +
    'a.href = url;' +
    'a.download = "exported_data_no_quotes.csv";' +
    'document.body.appendChild(a);' +
    'a.click();' +
    'URL.revokeObjectURL(url);' +
    'google.script.host.close();' +
    '</script></body></html>'
  ).setWidth(10).setHeight(10);

  SpreadsheetApp.getUi().showModalDialog(html, 'Exportando CSV');
}