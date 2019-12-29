import { CustomerList } from '../Action/CustomerAction';

const initialState = {
	customerList: [],
}

export default function CustomerReducer(state = initialState, { type, payload }) {
	switch (type) {
		case CustomerList:
			return {
				...state,
				customerList: payload
			}
		default:
			return state
	}
};

