const fs = require("fs");

const buf = fs.readFileSync("./process.json");
const data = JSON.parse(buf.toString());

const res = data.sort((a, b) => b["CPGEE SCORE"] - a["CPGEE SCORE"]);

res.map((val, index) => {
  if (val.applicant_name.trim() === "ABINASH  PHULKONWAR") {
    console.log("my position: ", index + 1);
  }
  if (val.applicant_name.trim() === "RICHA  DIHINGIA") {
    console.log(val.applicant_name, "position: ", index + 1);
  }
});

function saveToJSON(tableData, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(tableData, null, 2));
    console.log("Data converted to JSON and saved successfully.");
  } catch (error) {
    console.error("Error saving JSON file:", error);
    throw error;
  }
}

saveToJSON(res, "result.json");
