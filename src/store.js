import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'


/** --------------------------------------------------------
 *
 * Combine reducer - rootReducer
 */
import {
    example
} from './models'

const rootReducer = combineReducers({
    example
})

/** --------------------------------------------------------
 *
 * Saga Watcher
 */
import { exampleSagaWatcher } from './models'

const rootSaga = function * rootSaga () {
  yield [
    ...exampleSagaWatcher
  ]
}



/** --------------------------------------------------------
 *
 * App Default State
 */
const appDefaultState = {
}

/** --------------------------------------------------------
 *
 * Store
 */
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  appDefaultState,
  compose(
    applyMiddleware(
        sagaMiddleware
    ),
  )
)

sagaMiddleware.run(rootSaga)

export default store
