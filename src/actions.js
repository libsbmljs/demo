import { NULL_ACTION, SET_ENTERED_QUERY, DISPATCH_QUERY, QUERY_RESULTS, GET_MODEL_INFO, SET_MODEL_INFO, SET_MODEL_SRC, SET_MODEL_PROPERTIES, LIBSBML_LOADED, VALIDATE_MODEL, SET_MODEL_VALIDATION_RESULTS, ERRORS_READING_SBML, SET_EXPIRED_MODEL, SET_DRAGGING_MODEL, SET_VALIDATION_OPTIONS, RESET_VALIDATION, SET_SIMULATION_OPTIONS, SIMULATE_MODEL, SET_SIMULATION_RESULTS, SET_PARAMETER_VALUES } from 'constants.js'

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

export const setModelProperties = (sbml_model_token, n_reactions, n_species, n_compartments, n_parameters, n_events, n_functions, n_rules, tree_view) => ({
  type: SET_MODEL_PROPERTIES,
  sbml_model_token,
  n_reactions,
  n_species,
  n_compartments,
  n_parameters,
  n_events,
  n_functions,
  n_rules,
  tree_view,
})

export const libsbmlLoaded = () => ({
  type: LIBSBML_LOADED,
})

export const validateModel = (model, source, general_checks, identifier_checks, units_checks, mathml_checks, sbo_checks, overdetermined_checks, modeling_practice_checks) => ({
  type: VALIDATE_MODEL,
  model,
  source,
  general_checks,
  identifier_checks,
  units_checks,
  mathml_checks,
  sbo_checks,
  overdetermined_checks,
  modeling_practice_checks,
})

export const resetValidation = () => ({
  type: RESET_VALIDATION,
})

export const setValidationOptions = (general_checks, identifier_checks, units_checks, mathml_checks, sbo_checks, overdetermined_checks, modeling_practice_checks) => ({
  type: SET_VALIDATION_OPTIONS,
  general_checks,
  identifier_checks,
  units_checks,
  mathml_checks,
  sbo_checks,
  overdetermined_checks,
  modeling_practice_checks,
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

export const setExpiredModel = (model) => ({
  type: SET_EXPIRED_MODEL,
  model,
})

export const setDraggingModel = (value) => ({
  type: SET_DRAGGING_MODEL,
  value,
})

export const setSimulationOptions = (add_sliders, time_start, time_stop, num_timepoints, is_stochastic, num_replicates, enable_mean_trace) => ({
  type: SET_SIMULATION_OPTIONS,
  add_sliders,
  time_start,
  time_stop,
  num_timepoints,
  is_stochastic,
  num_replicates,
  enable_mean_trace,
})

export const simulateModel = (model, add_sliders, time_start, time_stop, num_timepoints, is_stochastic, num_replicates, enable_mean_trace, parameter_values, stochastic_inc=1) => ({
  type: SIMULATE_MODEL,
  model,
  add_sliders,
  time_start,
  time_stop,
  num_timepoints,
  is_stochastic,
  num_replicates,
  enable_mean_trace,
  stochastic_inc,
})

export const setSimulationResults = (model, simulation_results) => ({
  type: SET_SIMULATION_RESULTS,
  model,
  simulation_results,
})

export const setParameterValues = (parameter_values) => ({
  type: SET_PARAMETER_VALUES,
  parameter_values,
})
