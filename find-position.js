const { readFileSync } = require("fs");

const buf = readFileSync("./result.json");
const data = JSON.parse(buf.toString());

const findPosition = async (name = "") => {
  data.map((val, index) => {
    if (val.applicant_name.trim() === name) {
      console.log("position: ", val.applicant_name, index + 1);
    }
  });
};

findPosition("ABINASH  PHULKONWAR");
findPosition("RICHA  DIHINGIA");
