/* Core */
import {type ThunkAction, type Action} from '@reduxjs/toolkit';

import {reduxStore} from './store';
import {appReducers} from './rootReducer';

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	ReduxState,
	unknown,
	Action
>;
export type RootState = ReturnType<typeof appReducers>;
