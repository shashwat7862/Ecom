import { ProductList, ProvideApproval } from '../Action/ProductAction'

export default function ProductReducer(State = '', { type, payload }) {
    switch (type) {

        case ProductList:
            return payload
        case ProvideApproval:
            return payload
        

        default:
            return State
    }
};

