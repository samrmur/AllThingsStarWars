  
const fs = require('fs');

const {buildClientSchema, printSchema} = require('graphql');

function convertSchema(inputPath, outputPath) {
  const {data} = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const clientSchema = buildClientSchema(data);

  const graphqlSchemaString = printSchema(clientSchema);

  fs.writeFileSync(outputPath, graphqlSchemaString.replace(/Root/g, 'Query'));
  fs.unlinkSync(inputPath);
}

convertSchema('src/data/schema/schema.json', 'src/data/schema/schema.graphql');