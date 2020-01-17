/**
 * function to strip out the Graphql error string
 * @param {string} errorMessage error message
 */
export const formatGraphqlError = errorMessage => {
    return errorMessage.replace('GraphQL error:', '').trim()
}
