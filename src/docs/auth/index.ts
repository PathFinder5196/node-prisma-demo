import signup from "./signup";
import signin from "./signin"
import activateAccount from "./activateAccount";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import resendActivationToken from "./resendActivationToken";
const auth = {
    '/auth/signup': {
        ...signup,
    },
    '/auth/signin': {
        ...signin,
    },
    '/auth/activate-account': {
        ...activateAccount,
    },
    '/auth/resend-activation-token': {
        ...resendActivationToken,
    },
    '/auth/forgot-password': {
        ...forgotPassword,
    },
    '/auth/reset-password': {
        ...resetPassword,
    },
}

export default auth