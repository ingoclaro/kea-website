import { PropTypes } from 'react'
import Logic from 'kea/logic'

// import mirrorCreator from 'mirror-creator'

class HomepageLogic extends Logic {
  // PATH
  path = () => ['scenes', 'homepage', 'index']

  // CONSTANTS
  // constants = () => mirrorCreator([
  // ])
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateName: name => ({ name })
  })

  // STRUCTURE
  structure = ({ actions, constants }) => ({
    name: ['Chirpy', PropTypes.string, {
      [actions.updateName]: (state, payload) => payload.name
    }]
  })

  // SELECTORS
  selectors = ({ path, structure, constants, selectors }) => ({
    capitalizedName: [
      () => [PropTypes.string, selectors.name],
      (name) => name.trim().split(' ').map(k => `${k.charAt(0).toUpperCase()}${k.slice(1).toLowerCase()}`).join(' ')
    ]
  })
}

export default new HomepageLogic().init()
