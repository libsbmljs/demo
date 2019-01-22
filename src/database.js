import lunr from 'lunr'

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

export const idx = lunr(function () {
  const i = this
  i.ref('id')
  i.field('title')
  i.field('body')
  for (const doc of documents) {
    i.add(doc)
  }
})

console.log(idx.search("java*"))
