import { combineEpics, ofType } from 'redux-observable'
import { map, debounceTime, merge } from 'rxjs/operators'
import { of } from 'rxjs'
import { push } from 'connected-react-router'

import { dispatchQuery } from 'actions.js'
import { SET_ENTERED_QUERY } from 'constants.js'

const enteredQueryEpic = action$ =>
  action$.pipe(
    ofType(SET_ENTERED_QUERY),
    debounceTime(500),
    map(({query}) => ((dispatch) => {
      dispatch(dispatchQuery(query))
      dispatch(push('/search?q='+query))
    }))
    // map(({query}) => merge(
    //   of(dispatchQuery(query)),
    //   of((dispatch) => {push('/search?q='+query)})
    // ))
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
