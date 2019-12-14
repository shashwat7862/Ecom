import { EditProfile } from '../Action/ProfileAction'

export default function ProfileReducer(State = '', { type, payload }) {
    switch (type) {

        case EditProfile:
            return payload

        default:
            return State
    }
};

