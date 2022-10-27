import { getTronWeb, isTron } from './tron'

const contractWithSigner = async (env: any, contract: any, submitter: any) => {
    if (isTron(env)) {
        const tronWeb = await getTronWeb(env, submitter.privateKey || submitter.defaultPrivateKey)
        const contractAbi = contract.abi
        contract = await tronWeb.contract().at(contract.address)
        contract.loadAbi(contractAbi)
    } else contract.connect(submitter)
    return contract
}

export default contractWithSigner
