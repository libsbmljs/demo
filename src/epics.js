import { combineEpics, ofType } from 'redux-observable'
import { delay, map } from 'rxjs/operators'

import { dispatchQuery } from 'actions.js'
import { SET_ENTERED_QUERY } from 'constants.js'

export const rootEpic = action$ =>
  action$.pipe(
    ofType(SET_ENTERED_QUERY),
    delay(500),
    map(({query}) => dispatchQuery(query))
  )
