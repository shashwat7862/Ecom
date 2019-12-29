import { ProductList, ProvideApproval, OrderList, ReviewList } from '../Action/ProductAction';

const initialState = {
	productList: [],
	provideApproval: {},
	reviewList: [],
	orderList: []
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
		case ReviewList:
			return {
				...state,
				reviewList: payload
			}
		case OrderList:
			return {
				...state,
				orderList: payload
			}
		default:
			return state
	}
};

