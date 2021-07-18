/* eslint-disable @typescript-eslint/no-var-requires */
const {Builder} = require('graphql-typescript-definitions')
const {argv} = require('yargs')

const builder = new Builder({
  schemaTypesPath: 'src/data',
  addTypename: true
})

builder.on('error', error => {
  console.error(error)
})

builder.run({
  watch: Boolean(argv.watch)
})
