import lunr from 'lunr'
import { DISPATCH_QUERY } from 'constants.js'
// import { dispatchQuery } from 'actions.js'

console.log('i am teh worker')

const setupIndex = function() {
  const documents = [{
    "id": "first",
    "title": "Lunr",
    "body": "Like Solr, but much smaller, and not as bright."
  }, {
    "id": "second",
    "title": "React",
    "body": "A JavaScript library for building user interfaces."
  }, {
    "id": "third",
    "title": "Lodash",
    "body": "A modern JavaScript utility library delivering modularity, performance & extras."
  }, {
    "id": "BIOMOD00..12",
    "title": "Eliwotz2000 - Repressilator",
    "body": "A genetic oscillator circuit."
  }]
  return lunr(function () {
    const i = this
    i.ref('id')
    i.field('title')
    i.field('body')
    for (const doc of documents) {
      i.add(doc)
    }
  })
}
const idx = setupIndex()
// console.log(idx.search("java*"))

const onmessage = function(e) {
  console.log('le message', e.data)
}

const handleAction = (action) => {
  if (action.type === 'DISPATCH_QUERY') {
    return idx.search(action.query+'*')
  }
}

self.addEventListener('message', function(e) {
  console.log('worker event listener')
  // self.postMessage(e.data);
  handleAction(e.data)
}, false);
