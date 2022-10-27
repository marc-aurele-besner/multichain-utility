import currentBlock from './currentBlock'
import { isTron } from './Tron'

const increaseBlockTime = async (env: any, addSec: number) => {
    if (env.network.name === 'hardhat') {
        await env.network.provider.send('evm_increaseTime', [addSec])
        await env.ethers.provider.send('evm_mine')
    } else {
        let timestamp = await (await currentBlock(env)).timestamp
        const targetTimestamp = timestamp + addSec
        while (timestamp < targetTimestamp) {
            await env.ethers.provider.send('evm_mine')
            timestamp = await (await currentBlock(env)).timestamp
        }
    }
}

export default increaseBlockTime
