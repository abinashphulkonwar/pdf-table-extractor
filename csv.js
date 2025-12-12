const { json2csv } = require("json-2-csv");
const { readFileSync, writeFile } = require("fs");

const buf = readFileSync("./result.json");
const data = JSON.parse(buf.toString());

(async () => {
  const res = await json2csv(data, {});
  writeFile("data.csv", res, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
      return;
    }
    console.log("CSV file saved successfully.");
  });
})();
