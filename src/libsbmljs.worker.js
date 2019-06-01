import { setModelProperties, libsbmlLoaded, setModelValidationResults, errorsReadingSBML, setSimulationResults } from 'actions.js'
import { SET_MODEL_SRC, VALIDATE_MODEL, SIMULATE_MODEL, SET_SIMULATION_RESULTS } from 'constants.js'
import { range } from 'lodash'
import { loadFromSBML, makePlotlyGrid } from 'sbml_websim'

// import libsbml from 'libsbml.js'
import libsbml_module from 'libsbmljs_stable'
let libsbml = null
libsbml_module().then(((self,module) => {
  libsbml = module
  self.postMessage(libsbmlLoaded())
}).bind(undefined, self))

const constructKineticLawTree = (reaction) => {
  const parser = new libsbml.SBMLFormulaParser()
  return reaction.isSetKineticLaw() ?
    [{
      name: `Kinetic Law`,
      children: [
        {
          name: parser.formulaToL3String(reaction.getKineticLaw().getMath()),
        }
      ]
    }]
  :
    []
}

const constructReactionTree = (model) => (
  {
    name: `Reactions (${model.getNumReactions()})`,
    children: model.reactions.map((reaction) =>
      ({
        name: reaction.getId() || '<blank>',
        children: [
          {
            name: `Reactants (${reaction.getNumReactants()})`,
            children: range(reaction.getNumReactants()).map((n) =>
              ({
                name: reaction.getReactant(n).getSpecies() || '<blank>',
              })
            )
          },
          {
            name: `Products (${reaction.getNumProducts()})`,
            children: range(reaction.getNumProducts()).map((n) =>
              ({
                name: reaction.getProduct(n).getSpecies() || '<blank>',
              })
            )
          },
        ].concat(constructKineticLawTree(reaction)),
      })
    ),
  }
)

const constructSpeciesTree = (model) => (
  {
    name: `Species (${model.getNumSpecies()})`,
    children: model.species.map((species) =>
      ({
        name: species.getId() || '<blank>',
      })
    ),
  }
)

const populateCompartment = (compartment) => (
  compartment.isSetSize() ?
  {
    children: [
      {
        name: `Size: ${compartment.getSize()}`
      }
    ]
  }
  :
  {}
)

const constructCompartmentsTree = (model) => (
  {
    name: `Compartments (${model.getNumCompartments()})`,
    children: model.compartments.map((compartment) =>
      ({
        name: compartment.getId() || '<blank>',
        ...populateCompartment(compartment)
      })
    ),
  }
)

const constructParametersTree = (model) => (
  {
    name: `Parameters (${model.getNumParameters()})`,
    children: model.parameters.map((parameter) =>
      ({
        name: parameter.getId() || '<blank>',
      })
    ),
  }
)

const constructTriggerTree = (e) => {
  const parser = new libsbml.SBMLFormulaParser()
  if (e.isSetTrigger()) {
    const trigger = e.getTrigger()
    if (trigger.isSetMath()) {
      return [{
        name: 'Trigger',
        children: [{name: parser.formulaToL3String(trigger.getMath())}]
      }]
    } else {
      return []
    }
  } else {
    return []
  }
}

const constructEventsTree = (model) => (
  {
    name: `Events (${model.getNumEvents()})`,
    children: model.events.map((e) =>
      ({
        name: e.getId() || '<blank>',
        children: constructTriggerTree(e)
      })
    ),
  }
)

const populateFunctionTree = (f) => {
  const parser = new libsbml.SBMLFormulaParser()
  if (f.isSetMath()) {
    return {
      children: [{
        name: parser.formulaToL3String(f.getMath())
      }]
    }
  } else {
    return {}
  }
}

const constructFunctionsTree = (model) => (
  {
    name: `Functions (${model.getNumFunctionDefinitions()})`,
    children: model.functions.map((f) =>
      ({
        name: f.getId() || '<blank>',
        ...populateFunctionTree(f)
      })
    ),
  }
)

const getRuleName = (rule) => {
  const id = rule.getId() || '<blank>'
  if (rule.isRate()) {
    return id + ' (Rate)'
  } else if (rule.isAssignment()) {
    return id + ' (Assignment)'
  } else if (rule.isAlgebraic()) {
    return id + ' (Algebraic)'
  } else {
    return id + ' (Unknown)'
  }
}

const populateRuleTree = (rule) => {
  const parser = new libsbml.SBMLFormulaParser()
  if (rule.isSetMath()) {
    return {
      children: [{
        name: parser.formulaToL3String(rule.getMath())
      }]
    }
  } else {
    return {}
  }
}

const constructRulesTree = (model) => (
  {
    name: `Rules (${model.getNumRules()})`,
    children: model.rules.map((rule) =>
      ({
        name: getRuleName(rule),
        ...populateRuleTree(rule)
      })
    ),
  }
)

const constructTree = (model) => (
  {
    name: model.getId() || 'model',
    toggled: true,
    children: [
      constructReactionTree(model),
      constructSpeciesTree(model),
      constructCompartmentsTree(model),
      constructParametersTree(model),
      constructEventsTree(model),
      constructFunctionsTree(model),
      constructRulesTree(model),
    ],
  }
)

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
        constructTree(model),
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

      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_GENERAL_CONSISTENCY, action.general_checks)
      doc.setConsistencyChecks(libsbml.LIBSBML_CAT_IDENTIFIER_CONSISTENCY, action.identifier_checks)
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
    case SIMULATE_MODEL:{
      const { model, source, time_start, time_stop, num_timepoints, is_stochastic, num_replicates, enable_mean_trace, stochastic_inc } = action

      loadFromSBML(source, is_stochastic, stochastic_inc).then((sim) => {
        try {
          const thedata = makePlotlyGrid(sim, time_start, time_stop, num_timepoints, is_stochastic, num_replicates, enable_mean_trace)
          console.log(thedata)
          self.postMessage(setSimulationResults(
            model,
            {
              type: 'single',
              data: thedata,
            }
          ))
        } catch(error) {
          console.log(error)

          self.postMessage(setSimulationResults(
            model,
            {
              type: 'error',
              message: error.message,
            }
          ))
        }
      }
      )
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
