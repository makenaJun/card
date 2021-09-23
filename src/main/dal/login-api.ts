import {instance} from './api';

export const loginApi = {
    forgot(payload: ForgotRequestDataType) {
        return instance.post<RecoveryPassResponseType>('auth/forgot', payload);
    },
    setNewPassword(payload: SetNewPassRequestDataType) {
        return instance.post<RecoveryPassResponseType>('auth/set-new-password', payload);
    },
}

// TYPES
export type ForgotRequestDataType = {
    email: string,
    from: string,
    message: string,
}

export type SetNewPassRequestDataType = {
    password: string,
    resetPasswordToken: string,
}

export type RecoveryPassResponseType = {
    info: string,
    error?: string
}