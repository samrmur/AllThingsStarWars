# AllThingsStarWars
A React Native application about containing Star Wars information from the first six movies. All the information comes from the a hosted server that runs the following the GraphQL application: https://github.com/graphql/swapi-graphql

### Stack
- React
- React Native
- React Navigation
- React Native Paper
- GraphQL
- Apollo
- Storybook

### Running this project
Start the bundler server by choosing one of the options alone based on what you are developing:
- When testing a full fledged feature integrated into the navigation stack, run the development server of the application:
```
yarn start
```
- When testing individual components in Storybook, run the Storybook server of the application:
```
yarn storybook
```
Then run Android or iOS:
```
yarn android
yarn ios
```
If you need to clean the project:
```
yarn clean
```

### Generating GraphQL Types
To build types for the any GraphQL files created or updated, run:
```
yarn code-gen
```

### CI Checks
Current CI workflow does a lint & type check on every pull request. To see if your changes pass these tests before pushing you can run:
```
yarn lint
yarn check-style
yarn check-typescript
```
While `lint` and `check-typescript` need to be manually done, you can fix any code style issues with the following command:
```
yarn fix-style
```
