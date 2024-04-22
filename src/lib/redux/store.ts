/* Core */
import {configureStore} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */
import {middleware} from './middleware';
import {rootReducers} from './rootReducer';

export const reduxStore = configureStore({
	reducer: rootReducers,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(middleware);
	},
	devTools: __DEV__,
});
