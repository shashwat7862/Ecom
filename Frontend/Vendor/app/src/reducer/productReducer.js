import { ProductList, AddProduct ,EditProduct ,SearchProducts} from '../Action/ProductAction'

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

        default:
            return State
    }
};

