/* Core */
import {createLogger} from 'redux-logger';

/** *
 * ? Local & Shared Imports
 */
import {Android, iOS} from '@shared-constants/app-config';

const middleware = [
	createLogger({
		duration: true,
		timestamp: false,
		collapsed: true,
		colors: {
			title: () => '#139BFE',
			prevState: () => '#1C5FAF',
			action: () => '#149945',
			nextState: () => '#A47104',
			error: () => '#ff0005',
		},
		predicate: () => Android || iOS,
	}),
];

export {middleware};
