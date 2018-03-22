import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

const configureStore = () => {
    const middlewares = [thunk];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    return store;
}

export default configureStore;
