import { combineEpics, ofType } from 'redux-observable'
import { delay, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { dispatchQuery } from 'actions.js'
import { SET_ENTERED_QUERY } from 'constants.js'

const enteredQueryEpic = action$ =>
  action$.pipe(
    ofType(SET_ENTERED_QUERY),
    switchMap(action => of(action).pipe(
      delay(500),
      map(({query}) => dispatchQuery(query))
    ))
  )

// const dispatchQueryEpic = action$ =>
//   action$.pipe(
//     ofType(SET_ENTERED_QUERY),
//     delay(500),
//     map(({query}) => dispatchQuery(query))
//   )

export const rootEpic = combineEpics(
  enteredQueryEpic
  // dispatchQueryEpic
)
