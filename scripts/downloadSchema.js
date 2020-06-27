const { exec } = require("child_process");
const appConfig = require("../app.json")

exec(`yarn apollo-codegen download-schema ${appConfig.networkUrl} --output src/data/schema/schema.json`, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
});