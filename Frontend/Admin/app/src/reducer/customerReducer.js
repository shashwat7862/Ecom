import { CustomerList } from '../Action/CustomerAction'

export default function CustomerReducer(State = '', { type, payload }) {
    switch (type) {

        case CustomerList:
            return payload

        default:
            return State
    }
};

