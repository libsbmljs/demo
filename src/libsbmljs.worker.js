import { setModelProperties, libsbmlLoaded, setModelValidationResults, errorsReadingSBML } from 'actions.js'
import { SET_MODEL_SRC, VALIDATE_MODEL } from 'constants.js'
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
            key: k,
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
      console.log(action)

      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_GENERAL_CONSISTENCY, action.general_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_IDENTIFIER_CONSISTENCY, action.identifier_checks)
      console.log('check units', action.units_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_UNITS_CONSISTENCY, action.units_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_MATHML_CONSISTENCY, action.mathml_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_SBO_CONSISTENCY, action.sbo_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_OVERDETERMINED_MODEL, action.uverdetermined_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_MODELING_PRACTICE, action.modeling_practice_checks)

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
