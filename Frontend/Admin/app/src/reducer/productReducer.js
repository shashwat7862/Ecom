import { ProductList, ProvideApproval, OrderList, ReviewList } from '../Action/ProductAction';

const initialState = {
	productList: [],
	provideApproval: {}
}

export default function ProductReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ProductList:
			return {
				...state,
				productList: payload
			}
		case ProvideApproval:
			return {
				...state,
				provideApproval: payload
			}
		case OrderList:
			return payload
		case ReviewList:
			return payload
		default:
			return state
	}
};

