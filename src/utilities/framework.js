import { takeEvery } from 'redux-saga/effects'
import { mapValues, reduce } from 'lodash'

/**
 * Used in models, follow Ducks & redux-act conventions.
 * The created sagaWatcher should be exported as a constant to be used by rootSaga.
 *
 * -----------------------------------
 * modelA.js
 * -----------------------------------
 * import { createAction } from 'redux-act'
 * import { createSagaWatcher } from 'falcon'
 *
 * export const add = createAction('add something')
 *
 * export const saga = {
 *   [add]: function * (action) {
 *     // do some async stuff here...
 *   }
 * }
 *
 * export const sagaWatcher = createSagaWatcher(saga)
 *
 * -----------------------------------
 * store.js
 * -----------------------------------
 * import { sagaWatcher as modelASagaWatcher } from 'models/modelA'
 *
 * function * rootSaga () {
 *   yield [
 *     ...modelASagaWatcher
 *   ]
 * }
 */
export const createSagaWatcher = sagas => Object
  .keys(sagas)
  .map(type => (function * () { yield takeEvery(type, sagas[type]) })())
