import { isTron } from './tron'

const walletAddress = (env: any, wallet: any) => {
    if (isTron(env)) return wallet.address.hex
    else return wallet.address
}

export default walletAddress
