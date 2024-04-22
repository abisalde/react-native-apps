import {
	useSelector as useReduxSelector,
	useDispatch as useReduxDispatch,
	type TypedUseSelectorHook,
} from 'react-redux';

/**
 * ? Local & Shared Imports
 */

import {type ReduxDispatch, type ReduxState} from './types';

export const useAppDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> =
	useReduxSelector;
