import { ProductList, AddProduct ,EditProduct ,SearchProducts,ReviewList,OrderList} from '../Action/ProductAction'

const initialState = {
	productList: [],
	addProduct: []
}

export default function ProductReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ProductList:
			return {
				...state,
				productList: payload
			}
		case AddProduct:
			return {
				...state,
				addProduct: payload
			}
		case EditProduct:
			return payload
		case SearchProducts:
			return payload
		case ReviewList:
			return payload
		case OrderList:
			return payload
		default:
			return state
	}
};

