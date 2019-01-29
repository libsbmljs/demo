import { SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, GET_MODEL_INFO, SET_MODEL_INFO, SET_MODEL_SRC, SET_MODEL_PROPERTIES } from 'constants.js'

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

export const setModelSource = (model, source) => ({
  type: SET_MODEL_SRC,
  model,
  source,
})

export const setModelProperties = (model, n_reactions, n_species) => ({
  type: SET_MODEL_PROPERTIES,
  model,
  n_reactions,
  n_species,
})
