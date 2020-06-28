import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost'
import {networkUrl} from '../../../app.json'

const client = new ApolloClient({
  link: new HttpLink({uri: networkUrl}),
  cache: new InMemoryCache()
})

export default client
