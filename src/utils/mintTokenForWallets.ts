import checkTxnResult from './checkTxnResult'
import { isTron } from './tron'

const mintTokenForWallets = async (
    networkName: string,
    ERC20TokenContract: any,
    faucet: any,
    provider: any,
    wallets: any,
    mintAmount = '1000000'
) => {
    if (isTron(networkName))
        wallets.forEach(async (wallet: { address: { base58: string } }) => {
            const mintingInput = await ERC20TokenContract.mint(wallet.address.base58, mintAmount)
            await checkTxnResult(networkName, mintingInput, faucet, provider)
        })
    else
        wallets.forEach(async (wallet: { address: string }) => {
            const mintingInput = await ERC20TokenContract.connect(faucet).populateTransaction.mint(
                wallet.address,
                mintAmount
            )
            await checkTxnResult(networkName, mintingInput, faucet, provider)
        })
}

export default mintTokenForWallets
