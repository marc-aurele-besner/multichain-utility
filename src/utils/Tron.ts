import TronWeb from 'tronweb'

export const isTron = (networkName: string) => {
    switch (networkName) {
        case 'tron':
            return true
        case 'shasta':
            return true
        case 'shasta':
            return true
        case 'nile':
            return true
        case 'tronex':
            return true
        case 'tron-tronex':
            return true
        case 'tron-shasta':
            return true
        case 'tron-shasta':
            return true
        case 'tron-nile':
            return true
        default:
            return false
    }
}

export const identifyTronNetwork = (network: string, prefixIn: string = 'tron-', prefixOut: string = '') => {
    switch (network) {
        case 'tron':
            return prefixOut + 'tron'
        case prefixIn + 'mainnet':
            return prefixOut + 'mainnet'
        case 'shasta':
            return prefixOut + 'shasta'
        case prefixIn + 'shasta':
            return prefixOut + 'shasta'
        case 'nile':
            return prefixOut + 'nile'
        case prefixIn + 'nile':
            return prefixOut + 'nile'
        case 'tronex':
            return prefixOut + 'tronex'
        case prefixIn + 'tronex':
            return prefixOut + 'tronex'
    }
}

export const getTronFullHost = (networkName: string) => {
    switch (networkName) {
        case 'tron':
            return 'https://api.trongrid.io'
        case 'shasta':
            return 'https://api.shasta.trongrid.io'
        case 'nile':
            return 'https://api.nileex.io'
        case 'tronex':
            return 'https://testhttpapi.tronex.io'
        case 'tron-shasta':
            return 'https://api.shasta.trongrid.io'
        case 'tron-nile':
            return 'https://api.nileex.io'
        case 'tron-tronex':
            return 'https://testhttpapi.tronex.io'
    }
}

export const getTronWeb = (networkName: string, privateKey?: string) => {
    type TTonSetting = {
        fullHost: string
        privateKey?: string
    }
    const fullHost = getTronFullHost(networkName)
    let tronWebSetting: TTonSetting = {
        fullHost: fullHost || 'https://api.trongrid.io'
    }
    if (privateKey)
        tronWebSetting = {
            privateKey,
            ...tronWebSetting
        }
    const tronWeb = new TronWeb(tronWebSetting)
    return tronWeb
}
