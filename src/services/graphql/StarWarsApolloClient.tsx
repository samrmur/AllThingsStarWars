import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'
import {relayStylePagination} from '@apollo/client/utilities'
import {networkUrl} from '../../../app.json'

const client = new ApolloClient({
  link: new HttpLink({uri: networkUrl}),
  cache: new InMemoryCache({
    typePolicies: {
      Root: {
        queryType: true,
        fields: {
          allFilms: relayStylePagination(),
          allPeople: relayStylePagination(),
          allPlanets: relayStylePagination(),
          allSpecies: relayStylePagination(),
          allStarships: relayStylePagination(),
          allVehicles: relayStylePagination()
        }
      }
    }
  })
})

export default client
