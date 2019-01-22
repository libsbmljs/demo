import { SET_ENTERED_QUERY, DISPATCH_QUERY } from 'constants.js'

export const setEnteredQuery = query => ({
  type: SET_ENTERED_QUERY,
  query
})

export const dispatchQuery = query => ({
  type: DISPATCH_QUERY,
  query
})
