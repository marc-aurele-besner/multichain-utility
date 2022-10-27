import checkTxnResult from './checkTxnResult'
import contractWithSigner from './contractWithSigner'
import { isTron } from './tron'

export const txRead = async (
    env: any,
    instance: any,
    submitter: any,
    functionSignature: string,
    argument1?: any,
    argument2?: any,
    argument3?: any,
    argument4?: any,
    argument5?: any,
    extra?: any
) => {
    if (isTron(env)) {
        instance = await contractWithSigner(env, instance, submitter)
        switch (true) {
            case argument1 !== undefined &&
                argument2 !== undefined &&
                argument3 !== undefined &&
                argument4 !== undefined &&
                argument5 !== undefined:
                return instance[functionSignature](argument1, argument2, argument3, argument4, argument5).call()
            case argument1 !== undefined &&
                argument2 !== undefined &&
                argument3 !== undefined &&
                argument4 !== undefined:
                return instance[functionSignature](argument1, argument2, argument3, argument4).call()
            case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined:
                return instance[functionSignature](argument1, argument2, argument3).call()
            case argument1 !== undefined && argument2 !== undefined:
                return instance[functionSignature](argument1, argument2).call()
            case argument1 !== undefined:
                return instance[functionSignature](argument1).call()
            default:
                return instance[functionSignature]().call()
        }
    } else
        switch (true) {
            case argument1 !== undefined &&
                argument2 !== undefined &&
                argument3 !== undefined &&
                argument4 !== undefined &&
                argument5 !== undefined:
                return instance
                    .connect(submitter)
                    [functionSignature](argument1, argument2, argument3, argument4, argument5)
            case argument1 !== undefined &&
                argument2 !== undefined &&
                argument3 !== undefined &&
                argument4 !== undefined:
                return instance.connect(submitter)[functionSignature](argument1, argument2, argument3, argument4)
            case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined:
                return instance.connect(submitter)[functionSignature](argument1, argument2, argument3)
            case argument1 !== undefined && argument2 !== undefined:
                return instance.connect(submitter)[functionSignature](argument1, argument2)
            case argument1 !== undefined:
                return instance.connect(submitter)[functionSignature](argument1)
            default:
                return instance.connect(submitter)[functionSignature]()
        }
}

export const txWrite = async (
    env: any,
    instance: any,
    submitter: any,
    functionSignature: string,
    argument1?: any,
    argument2?: any,
    argument3?: any,
    argument4?: any,
    argument5?: any,
    extra?: any
) => {
    switch (true) {
        case argument1 !== undefined &&
            argument2 !== undefined &&
            argument3 !== undefined &&
            argument4 !== undefined &&
            argument5 !== undefined:
            return checkTxnResult(
                env,
                await instance[functionSignature](argument1, argument2, argument3, argument4, argument5),
                submitter
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined && argument4 !== undefined:
            return checkTxnResult(
                env,
                await instance[functionSignature](argument1, argument2, argument3, argument4),
                submitter
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined:
            return checkTxnResult(env, await instance[functionSignature](argument1, argument2, argument3), submitter)
        case argument1 !== undefined && argument2 !== undefined:
            return checkTxnResult(env, await instance[functionSignature](argument1, argument2), submitter)
        case argument1 !== undefined:
            return checkTxnResult(env, await instance[functionSignature](argument1), submitter)
        default:
            return checkTxnResult(env, await instance[functionSignature](), submitter)
    }
}

export const txWriteWithError = async (
    env: any,
    instance: any,
    submitter: any,
    functionSignature: string,
    error: string,
    argument1?: any,
    argument2?: any,
    argument3?: any,
    argument4?: any,
    argument5?: any,
    extra?: any
) => {
    switch (true) {
        case argument1 !== undefined &&
            argument2 !== undefined &&
            argument3 !== undefined &&
            argument4 !== undefined &&
            argument5 !== undefined:
            return checkTxnResult(
                env,
                await instance[functionSignature](argument1, argument2, argument3, argument4, argument5),
                submitter,
                error
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined && argument4 !== undefined:
            return checkTxnResult(
                env,
                await instance[functionSignature](argument1, argument2, argument3, argument4),
                submitter,
                error
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined:
            return checkTxnResult(
                env,
                await instance[functionSignature](argument1, argument2, argument3),
                submitter,
                error
            )
        case argument1 !== undefined && argument2 !== undefined:
            return checkTxnResult(env, await instance[functionSignature](argument1, argument2), submitter, error)
        case argument1 !== undefined:
            return checkTxnResult(env, await instance[functionSignature](argument1), submitter, error)
        default:
            return checkTxnResult(env, await instance[functionSignature](), submitter, error)
    }
}
