import { combineEpics, ofType } from 'redux-observable'
import { map, debounceTime, merge, tap, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { push } from 'connected-react-router'

import { dispatchQuery, getModelInfo, setModelSource } from 'actions.js'
import { SET_ENTERED_QUERY, DISPATCH_QUERY, GET_MODEL_INFO } from 'constants.js'

import Worker from 'database.worker.js';
export const database_worker = new Worker()

const enteredQueryEpic = action$ =>
  action$.pipe(
    ofType(SET_ENTERED_QUERY),
    debounceTime(500),
    map(({query}) => ((dispatch) => {
      dispatch(dispatchQuery(query))
      dispatch(push('/search?q='+query))
    }))
  )

const getModelInfoEpic = action$ =>
  action$.pipe(
    ofType(GET_MODEL_INFO),
    mergeMap(({model}) => ajax({url: 'biomodels/curated/BIOMD0000000070/BIOMD0000000070_url.xml', responseType: 'text'}).pipe(
      map(({response}) => setModelSource(model, response))
    ))
  )

export const rootEpic = combineEpics(
  enteredQueryEpic,
  getModelInfoEpic,
)
