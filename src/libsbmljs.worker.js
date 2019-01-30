import { setModelProperties } from 'actions.js'
import { SET_MODEL_SRC } from 'constants.js'

// import libsbml from 'libsbml.js'
import libsbml_module from 'libsbml.js'
let libsbml = null
libsbml_module().then((module) => {
  libsbml = module
})

const handleAction = (action) => {
  switch (action.type) {
    case SET_MODEL_SRC:
      setTimeout(() => {
        const reader = new libsbml.SBMLReader()
        const doc = reader.readSBMLFromString(action.source)
        const n_errors = doc.getNumErrors()
        if (n_errors > 0) {
          console.log('Errors when reading SBML document')
        }
        const model = doc.getModel()
        self.postMessage(setModelProperties(
          action.model,
          model.getNumReactions(),
          model.getNumSpecies(),
          model.getNumCompartments(),
          model.getNumParameters(),
          model.getNumEvents(),
          model.getNumFunctionDefinitions(),
          model.getNumRules(),
        ))
        }, 1000
      )
      return
    default:
      return
  }
}

self.addEventListener('message', function(e) {
  handleAction(e.data)
}, false);
