import checkTxnResult from './checkTxnResult'
import contractWithSigner from './contractWithSigner'
import { isTron } from './tron'

export const txRead = async (
    networkName: string,
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
    if (isTron(networkName)) {
        instance = await contractWithSigner(networkName, instance, submitter)
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
    networkName: string,
    instance: any,
    submitter: any,
    provider: any,
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
                networkName,
                await instance[functionSignature](argument1, argument2, argument3, argument4, argument5),
                submitter,
                provider
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined && argument4 !== undefined:
            return checkTxnResult(
                networkName,
                await instance[functionSignature](argument1, argument2, argument3, argument4),
                submitter,
                provider
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined:
            return checkTxnResult(networkName, await instance[functionSignature](argument1, argument2, argument3), submitter, provider)
        case argument1 !== undefined && argument2 !== undefined:
            return checkTxnResult(networkName, await instance[functionSignature](argument1, argument2), submitter, provider)
        case argument1 !== undefined:
            return checkTxnResult(networkName, await instance[functionSignature](argument1), submitter, provider)
        default:
            return checkTxnResult(networkName, await instance[functionSignature](), submitter, provider)
    }
}

export const txWriteWithError = async (
    networkName: string,
    instance: any,
    submitter: any,
    provider: any,
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
                networkName,
                await instance[functionSignature](argument1, argument2, argument3, argument4, argument5),
                submitter,
                provider,
                error
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined && argument4 !== undefined:
            return checkTxnResult(
                networkName,
                await instance[functionSignature](argument1, argument2, argument3, argument4),
                submitter,
                provider,
                error
            )
        case argument1 !== undefined && argument2 !== undefined && argument3 !== undefined:
            return checkTxnResult(
                networkName,
                await instance[functionSignature](argument1, argument2, argument3),
                submitter,
                provider,
                error
            )
        case argument1 !== undefined && argument2 !== undefined:
            return checkTxnResult(networkName, await instance[functionSignature](argument1, argument2), submitter, provider, error)
        case argument1 !== undefined:
            return checkTxnResult(networkName, await instance[functionSignature](argument1), submitter, provider, error)
        default:
            return checkTxnResult(networkName, await instance[functionSignature](), submitter, provider, error)
    }
}
