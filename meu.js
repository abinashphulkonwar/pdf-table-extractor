const { json2csv } = require("json-2-csv");
const { readFileSync, writeFile } = require("fs");

const buf = readFileSync("./MEU.json");
const data = JSON.parse(buf.toString());

const filterData = [];

data.pageTables.forEach((item) => {
  const row = item.tables;

  row.shift();
  row.shift();
  row.shift();
  row.shift();
  row.map((r) => {
    filterData.push({
      "Sl. No.": r[0],
      "Roll No": r[1],
      "Caste - Category": r[2],
      "PwBD ESM/ OIL - APP. WCL OIL - EMP.": r[3],
      "Date of Birth - (DD/MM/YYYY)": r[4],
      "Section - Part A": r[5],
      "Section - Part B": r[6],
      "Section - Part C": r[7],
      Total: r[8],
      "Result in - CBT - (Pass/Fail)": r[9],
    });
  });
});
console.log(filterData[1]);
(async () => {
  const res = await json2csv(filterData, {});
  writeFile("MEU.csv", res, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
      return;
    }
    console.log("CSV file saved successfully.");
  });
})();
