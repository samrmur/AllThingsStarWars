import {ApolloError} from 'apollo-boost'

export const apolloErrorExtractor = (error: ApolloError | undefined) => {
  if (error !== undefined) {
    return {
      name: error?.name,
      message: error?.message
    }
  } else {
    return undefined
  }
}
