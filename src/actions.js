import { NULL_ACTION, SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, GET_MODEL_INFO, SET_MODEL_INFO, SET_MODEL_SRC, SET_MODEL_PROPERTIES, LIBSBML_LOADED, VALIDATE_MODEL, SET_MODEL_VALIDATION_RESULTS } from 'constants.js'

export const nullAction = () => ({
  type: NULL_ACTION,
})

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

export const getModelInfo = (model) => ({
  type: GET_MODEL_INFO,
  model
})

export const setModelInfo = (model, title, origin, curated) => ({
  type: SET_MODEL_INFO,
  model,
  title,
  origin,
  curated,
})

export const setModelSource = (model, source) => ({
  type: SET_MODEL_SRC,
  model,
  source,
})

export const setModelProperties = (sbml_model_token, n_reactions, n_species, n_compartments, n_parameters, n_events, n_functions, n_rules) => ({
  type: SET_MODEL_PROPERTIES,
  sbml_model_token,
  n_reactions,
  n_species,
  n_compartments,
  n_parameters,
  n_events,
  n_functions,
  n_rules,
})

export const libsbmlLoaded = () => ({
  type: LIBSBML_LOADED,
})

export const validateModel = (model) => ({
  type: VALIDATE_MODEL,
  model,
})

export const setModelValidationResults = (model, is_valid, consistency_errors) => ({
  type: SET_MODEL_VALIDATION_RESULTS,
  model,
  is_valid,
  consistency_errors,
})

export const errorsReadingSBML = (model, errors) => ({
  type: ERRORS_READING_SBML,
  model,
  errors,
})
