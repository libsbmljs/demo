import { combineEpics, ofType } from 'redux-observable'
import { map, debounceTime, merge, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { push } from 'connected-react-router'

import { dispatchQuery } from 'actions.js'
import { SET_ENTERED_QUERY, DISPATCH_QUERY } from 'constants.js'

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

export const rootEpic = combineEpics(
  enteredQueryEpic
)
