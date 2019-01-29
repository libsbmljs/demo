import { SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, GET_MODEL_INFO, SET_MODEL_INFO } from 'constants.js'

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

export const getModelInfo = model => ({
  type: GET_MODEL_INFO,
  model
})

export const setModelInfo = (model, origin, curated) => ({
  type: SET_MODEL_INFO,
  model,
  origin,
  curated,
})
