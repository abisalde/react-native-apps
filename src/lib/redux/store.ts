/* Core */
import {configureStore} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */
import {middleware} from './middleware';
import rootReducer from './rootReducer';

export const reduxStore = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(middleware);
	},
	devTools: __DEV__,
});
