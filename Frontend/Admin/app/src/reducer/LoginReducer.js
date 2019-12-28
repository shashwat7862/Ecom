import { VerifyOTP, SendOTP} from '../Action/LoginAction'

export default function LoginReducer(State = {}, { type, payload }) {
    switch (type) {

        case VerifyOTP:
            return payload
        case SendOTP:
            return payload
        default:
            return State
    }
};

