import { createReducer, createAction } from 'redux-act'
import { createSagaWatcher } from '../utilities/framework'

/** --------------------------------------------------
 *
 * Actions
 *
 */
export const someAction = createAction('some Action')
export const anotherAction = createAction('another Action')

/** --------------------------------------------------
 *
 * Sagas
 *
 */
export const sagas = {
  [anotherAction]: function * () {
    console.log('another action!')
  }
}
export const exampleSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
 *
 * Reducers
 *
 */
export const exampleReducers = {
  [someAction]: state => ({ 
      ...state,
      someAction: 'HELLO!!!'       
  })
}

export const exampleInitialState = {}

export const example = createReducer(example, exampleInitialState)
