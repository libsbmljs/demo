import { setModelProperties, libsbmlLoaded, setModelValidationResults } from 'actions.js'
import { SET_MODEL_SRC, VALIDATE_MODEL, ERRORS_READING_SBML } from 'constants.js'
import { range } from 'lodash'

// import libsbml from 'libsbml.js'
import libsbml_module from 'libsbmljs_stable'
let libsbml = null
libsbml_module().then(((self,module) => {
  libsbml = module
  self.postMessage(libsbmlLoaded())
}).bind(undefined, self))

const handleAction = (action) => {
  switch (action.type) {
    case SET_MODEL_SRC:{
      const reader = new libsbml.SBMLReader()
      const doc = reader.readSBMLFromString(action.source)
      const n_errors = doc.getNumErrors()
      if (n_errors > 0) {
        self.postMessage(errorsReadingSBML(
          action.model,
          range(n_errors).map(k =>
          ({
            message: doc.getError(k).getMessage(),
          })
        )))
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
      return
    }
    case VALIDATE_MODEL:{
      const reader = new libsbml.SBMLReader()
      const doc = reader.readSBMLFromString(action.source)
      const loading_errors = doc.getNumErrors()
      if (loading_errors > 0) {
        console.log('Errors when reading SBML document') // TODO: post error
      }
      const n_consistency_errors = doc.checkConsistency() ? doc.getNumErrors() : 0
      const consistency_errors = range(n_consistency_errors).map(k =>
        ({
          key: k,
          message: doc.getError(k).getMessage(),
        })
      )
      self.postMessage(setModelValidationResults(
        action.model,
        n_consistency_errors === 0,
        consistency_errors,
      ))
      return
    }
    default:
      return
  }
}

self.addEventListener('message', function(e) {
  handleAction(e.data)
}, false)

// while(libsbml === null) {
// }
// self.postMessage(libsbmlLoaded())
