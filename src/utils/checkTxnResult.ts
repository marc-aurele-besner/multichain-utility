import sleep from './sleep'
import submitRawTxn from './submitRawTxn'
import { getTronWeb, isTron } from './tron'

const checkTxnResult = async (networkName: string, input: any, sender: any, provider: any, errMsg?: any) => {
    let result
    if (isTron(networkName)) {
        const tronWeb = await getTronWeb(networkName, sender.privateKey)
        result = await submitRawTxn(networkName, input, sender, provider)
        if (errMsg) {
            try {
                result = await tronWeb.trx.getTransaction(result)
            } catch (e) {
                result = 'failed'
            }
        } else {
            const receipt = await tronWeb.trx.getTransaction(result)
            let receiptResult
            let trxMinted = false
            let tryCount = 0
            while (!trxMinted && tryCount < 50) {
                try {
                    receiptResult = await tronWeb.trx.getConfirmedTransaction(result)
                    trxMinted = true
                    result = receiptResult.ret[0].contractRet
                } catch (e) {}
                tryCount++
                await sleep(30000) // 30 seconds (it usually take 1 minute to be minted)
            }
        }
    } else {
        result = await submitRawTxn(networkName, input, sender, provider)
    }
    return result
}

export default checkTxnResult
