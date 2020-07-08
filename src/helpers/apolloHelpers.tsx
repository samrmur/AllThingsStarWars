import {ApolloError, ApolloQueryResult, OperationVariables} from 'apollo-boost'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function refreshController<V extends OperationVariables, T extends any>(
  refetch: (variables?: V) => Promise<ApolloQueryResult<T>>,
  variables?: V
): void {
  refetch(variables).catch(() => undefined)
}
