import checkTxnResult from './checkTxnResult'
import { isTron } from './tron'

const mintTokenForWallets = async (
    env: any,
    ERC20TokenContract: any,
    faucet: any,
    wallets: any,
    mintAmount = '1000000'
) => {
    if (isTron(env))
        wallets.forEach(async (wallet: { address: { base58: string } }) => {
            const mintingInput = await ERC20TokenContract.mint(wallet.address.base58, mintAmount)
            await checkTxnResult(env, mintingInput, faucet)
        })
    else
        wallets.forEach(async (wallet: { address: string }) => {
            const mintingInput = await ERC20TokenContract.connect(faucet).populateTransaction.mint(
                wallet.address,
                mintAmount
            )
            await checkTxnResult(env, mintingInput, faucet)
        })
}

export default mintTokenForWallets
