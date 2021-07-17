import {ApolloClient, ApolloLink, InMemoryCache} from '@apollo/client'
import {relayStylePagination} from '@apollo/client/utilities'

export default function createStarWarsConfiguredClient(link: ApolloLink) {
  return new ApolloClient({
    link: link,
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
}
