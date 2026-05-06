# Export Google Sheet CSV with Semicolon

A **Google Apps Script** project that exports the active **Google Sheets** tab to a **CSV** file using **semicolon (`;`)** as the delimiter.

The download is triggered directly in the browser, without creating a temporary file in Google Drive. This helps avoid permission issues related to `DriveApp`.

## Main Function

The main function in this project is:

```javascript
exportCsvCustomDelimiterNoQuotes()
```

It performs the following steps:

- gets the active sheet from the current spreadsheet;
- reads all visible cell values using `getDisplayValues()`;
- builds the CSV content using `;` as the delimiter;
- generates the file in **UTF-8 with BOM** for better Excel compatibility;
- opens a small HTML dialog that automatically starts the `.csv` download.

## Features

- Exports the **active sheet** only.
- Uses **`;`** as the CSV separator.
- Does not add extra quotes around values.
- Uses `getDisplayValues()` to export data exactly as shown in the sheet.
- Does not depend on Google Drive to generate the file.
- Default output filename: `exported_data_no_quotes.csv`

## Project Structure

This project contains a single Apps Script file:

```text
Export Google Sheet CSV with semicolon.gs
```

## Requirements

- A Google account with access to **Google Sheets**.
- Permission to run **Google Apps Script**.
- A browser that supports Blob-based downloads with JavaScript.

## Installation

1. Open your spreadsheet in Google Sheets.
2. Go to **Extensions > Apps Script**.
3. Create a new project or use an existing one.
4. Paste the `.gs` file content into the editor.
5. Save the project.

## Usage

1. In Apps Script, run the function:

```javascript
exportCsvCustomDelimiterNoQuotes()
```

2. On the first run, authorize the script.
3. The script will open a small dialog and automatically download the CSV file.

## Output

- Filename: `exported_data_no_quotes.csv`
- Encoding: `UTF-8` with BOM
- Delimiter: `;`
- Data source: current active sheet

## Notes

### Dates and numbers
Because the script uses `getDisplayValues()`, it exports the data exactly as it appears in the sheet. This is useful when you want to preserve:

- date formatting;
- local decimal separators;
- user-visible text formatting.

### CSV quoting behavior
This script is designed to generate a simple CSV without automatically wrapping every field in quotes. That works well for many internal workflows and lightweight integrations.

If your sheet contains values with `;`, line breaks, or double quotes inside the content, you may want to add an escaping routine to make the CSV more robust.

### Permissions
This version avoids `DriveApp`, so it usually requires fewer permissions than approaches that first create files in Google Drive before providing the download.

## Suggested Improvements

- allow exporting a specific sheet by name;
- customize the exported filename;
- add a custom menu inside Google Sheets;
- allow choosing the delimiter (`;` or `,`);
- handle escaping for quotes, delimiters, and line breaks;
- export only a selected range or filtered rows.

## Optional Menu Example

You can add an `onOpen()` function to make the export available directly from the spreadsheet menu:

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CSV Export')
    .addItem('Export current sheet', 'exportCsvCustomDelimiterNoQuotes')
    .addToUi();
}
```

## License

It is free to use.
