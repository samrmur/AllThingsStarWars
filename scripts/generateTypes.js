const {Builder} = require('graphql-typescript-definitions');
const {argv} = require('yargs');
 
const builder = new Builder({
  schemaTypesPath: 'src/data',
  addTypename: true
});

builder.on('build:schema', (schema) => {
  console.log(schema)
});
 
builder.on('error', (error) => {
  console.error(error);
});

builder.run({
  watch: Boolean(argv.watch),
});
