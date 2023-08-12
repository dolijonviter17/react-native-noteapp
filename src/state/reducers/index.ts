import {combineReducers} from 'redux';
import repositoriesReducer from './repositoriesReducer';
import livescoreReducer from './livescoresReducers';
const reducers = combineReducers({
  repositories: repositoriesReducer,
  livescores: livescoreReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
