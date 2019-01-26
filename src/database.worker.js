import lunr from 'lunr'
import { DISPATCH_QUERY } from 'constants.js'
import { queryResults } from 'actions.js'
import { List, Map } from 'immutable'

// import corpus from '../assets/libsbmljs_demo_corpus.json'
import corpus from '../assets/libsbmljs_demo_corpus_reduced.json'
import rawidx from '../assets/libsbmljs_demo_index.json'
const idx = lunr.Index.load(rawidx)
const documents = Map(List(corpus).map(c => [c.id, c]))

const processResults = (results) => (
  List(results).map(r => documents.get(r.ref)).toJS()
)

const handleAction = (action) => {
  if (action.type === 'DISPATCH_QUERY') {
    self.postMessage(queryResults(processResults(idx.search('*'+action.query+'*'))))
  }
}

self.addEventListener('message', function(e) {
  handleAction(e.data)
}, false);
