import { expect } from 'chai'

import sleep from './sleep'
import submitRawTxn from './submitRawTxn'
import { getTronWeb, isTron } from './Tron'

const checkTxnResult = async (env: any, input: any, sender: any, errMsg?: any) => {
    let result
    if (isTron(env)) {
        const tronWeb = await getTronWeb(env, sender.privateKey)
        result = await submitRawTxn(env, input, sender)
        if (errMsg) {
            try {
                result = await tronWeb.trx.getTransaction(result)
            } catch (e) {
                result = 'failed'
            }
            await expect(result).to.be.equal('failed')
        } else {
            const receipt = await tronWeb.trx.getTransaction(result)
            expect(typeof receipt.signature).to.not.equal('undefined')
            let receiptResult
            let trxMinted = false
            let tryCount = 0
            while (!trxMinted && tryCount < 50) {
                try {
                    receiptResult = await tronWeb.trx.getConfirmedTransaction(result)
                    trxMinted = true
                } catch (e) {}
                tryCount++
                await sleep(30000) // 30 seconds (it usually take 1 minute to be minted)
            }
            expect(receiptResult.ret[0].contractRet).to.be.equal('SUCCESS')
        }
    } else {
        if (errMsg)
            if (env.network.name === 'hardhat')
                await expect(submitRawTxn(env, input, sender)).to.be.revertedWith(errMsg)
            else expect.fail('AssertionError: ' + errMsg)
        else {
            result = await submitRawTxn(env, input, sender)
            expect(result.status).to.equal(1)
        }
    }
    return result
}

export default checkTxnResult
