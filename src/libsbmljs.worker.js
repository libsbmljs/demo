import libsbml from 'libsbml.js'
libsbml().then(() => {
  console.log('libsml.js loaded from worker')
})
