import { utils } from 'ethers'

import { isTron } from './Tron'

const submitRawTxn = async (networkName:string, input: any, sender: any, provider: any, extra?: any) => {
    if (isTron(input.network)) {
        return input.send(
            !extra ? {
                feeLimit: 500_000_000,
                callValue: 0
            } : extra
        )
    } else {
        const txCount = await provider.getTransactionCount(sender.address)
        const rawTransactionHex = await sender.signTransaction(
            !extra ? {
                nonce: utils.hexlify(txCount),
                to: input.to,
                value: 0x00,
                gasLimit: utils.hexlify(1950000),
                gasPrice: utils.hexlify(5000),
                data: input.data
            } : extra
        )
        const { hash } = await provider.sendTransaction(rawTransactionHex)
        await provider.waitForTransaction(hash)
        return provider.getTransactionReceipt(hash)
    }
}

export default submitRawTxn
