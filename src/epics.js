import { combineEpics, ofType } from 'redux-observable'
import { map, debounceTime, merge, tap, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { push } from 'connected-react-router'

import { dispatchQuery, getModelInfo, setModelSource } from 'actions.js'
import { SET_ENTERED_QUERY, DISPATCH_QUERY, SET_MODEL_INFO } from 'constants.js'

import DatabaseWorker from 'database.worker.js'
export const database_worker = new DatabaseWorker()

import LibsbmljsWorker from 'libsbmljs.worker.js'
export const libsbmljs_worker = new LibsbmljsWorker()

const remapBiggModel = (id) => {
  if (id === 'e_coli_core')
    return 'ecoli_core_model'
  return id
}

const buildModelUrl = (model, origin, curated) => {
  if (origin === 'BioModels') {
    if (curated === 'Yes') {
      return `biomodels/curated/${model}/${model}_url.xml`
    } else {
      return `biomodels/non_curated/${model}/${model}_url.xml`
    }
  } else {
    return `bigg_models/${remapBiggModel(model)}.xml`
  }
}

const enteredQueryEpic = action$ =>
  action$.pipe(
    ofType(SET_ENTERED_QUERY),
    debounceTime(500),
    map(({query}) => ((dispatch) => {
      dispatch(dispatchQuery(query))
      dispatch(push('/search?q='+query))
    }))
  )

const setModelInfoEpic = action$ =>
  action$.pipe(
    ofType(SET_MODEL_INFO),
    mergeMap(({model, origin, curated}) => ajax({url: buildModelUrl(model, origin, curated), responseType: 'text'}).pipe(
      map(({response}) => setModelSource(model, response))
    ))
  )

export const rootEpic = combineEpics(
  enteredQueryEpic,
  setModelInfoEpic,
)
