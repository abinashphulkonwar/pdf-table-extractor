const fs = require("fs");

const buf = fs.readFileSync("./output.json");
const data = JSON.parse(buf.toString());

const pol = (() => {
  const res = [];
  data.pageTables?.map((val) => {
    val.tables?.map((tab) => {
      if (tab[4]?.trim() === "POLITICAL SCIENCE") {
        res.push({
          application_id: tab[0].trim(),
          applicant_name: tab[1].trim(),
          gender: tab[2].trim(),
          category: tab[3].trim(),
          subject_name: tab[4].trim(),
          "CPGEE SCORE": parseInt(tab[5].trim()),
        });
      }
    });
  });
  return res;
})();

function saveToJSON(tableData, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(tableData, null, 2));
    console.log("Data converted to JSON and saved successfully.");
  } catch (error) {
    console.error("Error saving JSON file:", error);
    throw error;
  }
}

saveToJSON(pol, "process.json");
