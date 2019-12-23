import { ProductList, ProvideApproval,OrderList,ReviewList } from '../Action/ProductAction'

export default function ProductReducer(State = '', { type, payload }) {
    switch (type) {

        case ProductList:
            return payload
        case ProvideApproval:
            return payload
        case OrderList:
            return payload
        case ReviewList:
            return payload
        

        default:
            return State
    }
};

