import { getTronWeb, isTron } from './tron'

const createRandomWallet = async (env: any) => {
    if (isTron(env)) {
        const tronWeb = await getTronWeb(env, '')
        return tronWeb.createAccount()
    } else {
        return env.ethers.Wallet.createRandom()
    }
}

export default createRandomWallet
