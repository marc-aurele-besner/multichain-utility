import { getTronWeb, isTron } from './Tron'

const currentBlock = async (env: any) => {
    if (isTron(env)) {
        const tronWeb = await getTronWeb(env, '')
        const { block_header } = await tronWeb.trx.getCurrentBlock()
        return block_header.raw_data.number
    } else return env.ethers.provider.getBlock(await env.ethers.provider.getBlockNumber())
}

export default currentBlock
