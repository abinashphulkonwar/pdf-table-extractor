const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
//const { PDFTableExtractor } = require("pdf-table-extractor");
const pdf_table_extractor = require("pdf-table-extractor");

async function readPDF(filePath) {
  try {
    const pdfBytes = await fs.promises.readFile(filePath);
    return PDFDocument.load(pdfBytes);
  } catch (error) {
    console.error("Error reading the PDF:", error);
    throw error;
  }
}

async function extractTables(pdfDoc) {
  try {
    const tableExtractor = await PDFTableExtractor.load();
    const tableData = [];

    // Start from page 2 (since page 1 is assumed to be text only)

    for (
      let pageNumber = 2;
      pageNumber <= pdfDoc.getPageCount();
      pageNumber++
    ) {
      const page = pdfDoc.getPage(pageNumber);
      const table = await tableExtractor.extract(page);
      tableData.push({ page: pageNumber, table });
    }

    return tableData;
  } catch (error) {
    console.error("Error extracting tables:", error);
    throw error;
  }
}

function saveToJSON(tableData, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(tableData, null, 2));
    console.log("Data converted to JSON and saved successfully.");
  } catch (error) {
    console.error("Error saving JSON file:", error);
    throw error;
  }
}

async function convertPDFtoJSON(inputFilePath, outputFilePath) {
  try {
    const pdfDoc = await readPDF(inputFilePath);
    const tableData = await extractTables(pdfDoc);
    saveToJSON(tableData, outputFilePath);
  } catch (error) {
    console.error("Error converting PDF to JSON:", error);
  }
}

const inputFilePath = "Document from Abinash Phulkonwar 1.pdf";
const outputFilePath = "MEU.json";

//convertPDFtoJSON(inputFilePath, outputFilePath);
function success(result) {
  saveToJSON(result, outputFilePath);
}

//Error
function error(err) {
  console.error("Error: " + err);
}
pdf_table_extractor(inputFilePath, success, error);
