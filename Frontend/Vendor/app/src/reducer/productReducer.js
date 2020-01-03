import { ProductList, AddProduct ,EditProduct,CustomerList ,SearchProducts,ReviewList,OrderList} from '../Action/ProductAction'

export default function ProductReducer(State = '', { type, payload }) {
    switch (type) {

        case ProductList:
            return payload
        case AddProduct:
            return payload
        case EditProduct:
            return payload
        case SearchProducts:
            return payload
        case ReviewList:
             return payload
        case OrderList:
            return payload
        case CustomerList:
            return payload

        default:
            return State
    }
};

