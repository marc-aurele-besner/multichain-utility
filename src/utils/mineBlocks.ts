import currentBlock from './currentBlock'
import currentBlockNumber from './currentBlockNumber'
import sleep from './sleep'
import { isTron } from './Tron'

const mineBlocks = async (env: any, start: number, mine = 1) => {
    if (isTron(env)) await sleep(120000) // 2 minutes
    else {
        let newBlockNumber = 0
        while (start > newBlockNumber) {
            await env.ethers.provider.send('evm_mine')
            if (env.network.name === 'hardhat' || env.network.name === 'localhost')
                newBlockNumber = await currentBlockNumber(env)
            else await sleep(10000)
        }
    }
}

export default mineBlocks
