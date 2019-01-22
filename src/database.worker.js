import lunr from 'lunr'
import { DISPATCH_QUERY } from 'constants.js'
import { queryResults } from 'actions.js'
import { List, Map } from 'immutable'

const corpus = [{
  "id": "first",
  "title": "Lunr",
  "body": "Like Solr, but much smaller, and not as bright.",
  "origin": "lunr"
}, {
  "id": "second",
  "title": "React",
  "body": "A JavaScript library for building user interfaces.",
  "origin": "lunr"
}, {
  "id": "third",
  "title": "Lodash",
  "body": "A modern JavaScript utility library delivering modularity, performance & extras.",
  "origin": "lunr"
}, {
  "id": "BIOMOD00..12",
  "title": "Eliwotz2000 - Repressilator",
  "body": "A genetic oscillator circuit.",
  "origin": "BioModels"
}]
const documents = Map(List(corpus).map(c => [c.id, c]))

const setupIndex = function() {
  return lunr(function () {
    const i = this
    i.ref('id')
    i.field('title')
    i.field('body')
    for (const doc of corpus) {
      i.add(doc)
    }
  })
}
const idx = setupIndex()

const processResults = (results) => (
  List(results).map(r => {
    const d = documents.get(r.ref)
    // return {id: d.id, title: d.title, origin: d.origin}
    return [d.id, d.title, d.origin]
  }).toJS()
)

const handleAction = (action) => {
  if (action.type === 'DISPATCH_QUERY') {
    self.postMessage(queryResults(processResults(idx.search(action.query+'*'))))
  }
}

self.addEventListener('message', function(e) {
  handleAction(e.data)
}, false);
