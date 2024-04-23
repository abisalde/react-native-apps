import * as React from 'react';
import {Provider} from 'react-redux';

/**
 * ? Local & Shared Imports
 */

import {reduxStore} from '@lib/redux';

export const StoreProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => <Provider store={reduxStore}>{children}</Provider>;
