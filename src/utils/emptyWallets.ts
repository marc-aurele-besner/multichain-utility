import { getTronWeb, isTron } from './tron'

const emptyWallets = async (env: any, wallets: any[], admin: any) => {
    if (env.network.name === 'hardhat') return
    if (isTron(env)) {
        const tronWeb = await getTronWeb(env, '')
        wallets.forEach(async (wallet: { address: { hex: string; base58: string }; privateKey: string }) => {
            const existingBalance = await tronWeb.trx.getBalance(wallet.address.hex)
            if (existingBalance > 1000000) {
                const transaction = await tronWeb.transactionBuilder.sendTrx(
                    admin.defaultAddress.hex,
                    existingBalance - 1000000,
                    wallet.address.hex
                ) // Sending 95% of the balance to the main wallet (to leave some for fees)
                const signedTransaction = await tronWeb.trx.sign(transaction, wallet.privateKey)
                await tronWeb.trx.sendRawTransaction(signedTransaction)
            }
        })
    } else {
        wallets.forEach(async (wallet: { address: string }) => {
            const existingBalance = await env.ethers.utils.getBalance(wallet.address)
            await admin.sendTransaction({
                to: admin.address,
                value: existingBalance
            })
        })
    }
}

export default emptyWallets
