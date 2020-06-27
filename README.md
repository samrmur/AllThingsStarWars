# AllThingsStarWars
A React Native application about containing Star Wars information from the first six movies. All the information comes from the a hosted server that runs the following the GraphQL server: https://github.com/graphql/swapi-graphql

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
To build types for the any GraphQL files created, run:
```
yarn code-gen
```
