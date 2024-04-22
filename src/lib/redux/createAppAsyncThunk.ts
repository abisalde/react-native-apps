import {createAsyncThunk} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */
import type {ReduxState, ReduxDispatch} from './types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: ReduxState;
	dispatch: ReduxDispatch;
	rejectValue: string;
}>();
