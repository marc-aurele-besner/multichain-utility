import { getTronWeb, isTron } from './tron'

const createWallets = async (env: any, numberOfWallet: number, etherFaucetAddress: any, totalEther: string) => {
    const wallets = []
    if (isTron(env)) {
        const tronWeb = await getTronWeb(env, '')
        for (let i = 0; i < numberOfWallet; i++) {
            const temp = await tronWeb.createAccount()
            const existingBalance = await tronWeb.trx.getBalance(temp.address.hex)
            if (existingBalance === 0) {
                const transaction = await tronWeb.transactionBuilder.sendTrx(
                    temp.address.hex,
                    totalEther + '0' + '000000',
                    etherFaucetAddress.defaultAddress.hex
                ) // Sending 100 TRX to the new account
                const signedTransaction = await etherFaucetAddress.trx.sign(transaction, etherFaucetAddress.privateKey)
                await etherFaucetAddress.trx.sendRawTransaction(signedTransaction)
                wallets[i] = temp
            }
        }
    } else
        for (let i = 0; i < numberOfWallet; i++) {
            const temp = await env.ethers.Wallet.createRandom()
            await etherFaucetAddress.sendTransaction({
                to: temp.address,
                value: env.ethers.utils.parseEther(totalEther)
            })
            wallets[i] = temp.connect(env.ethers.provider)
        }
    return wallets
}

export default createWallets
