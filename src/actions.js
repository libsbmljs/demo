import { SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, SET_ACTIVE_MODEL } from 'constants.js'

export const setEnteredQuery = query => ({
  type: SET_ENTERED_QUERY,
  query
})

export const dispatchQuery = query => ({
  type: DISPATCH_QUERY,
  query
})

export const queryResults = results => ({
  type: QUERY_RESULTS,
  results
})

export const setActiveModel = model => ({
  type: SET_ACTIVE_MODEL,
  model
})
