import input from '@inquirer/input';
import select from '@inquirer/select';
import { ethers } from "ethers"

import dotenv from 'dotenv';
dotenv.config()

const availableNetworks = [
    {
        name: "GnosisChain Mainnet",
        description: "GnosisChain Mainnet Network",
        value: "https://rpc.gnosis.gateway.fm"
    },
    {
        name: "Optimism Mainnet",
        description: "Optimism Mainnet Network",
        value: "https://optimism.publicnode.com	"
    }
]

export async function createNewWallet() {
    let addys = []

    const addressAmount = await input({ message: 'How many addresses do you want to create?:' });

    if(addressAmount > 1) {
        for (let index = 0; index < addressAmount; index++) {
            const wallet = ethers.Wallet.createRandom()
            addys.push({
                address: wallet.address,
                private_key: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase
            })
        }
    }
    else {
        const wallet = ethers.Wallet.createRandom()
        addys.push({
            address: wallet.address,
            private_key: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        })
    }

    console.table(addys)
}

export async function createNewContract() {

    const targetNetworkRPC = await select({
        message: 'What is the target network?',
        choices: availableNetworks
    });
    
    const provider = new ethers.providers.JsonRpcProvider(targetNetworkRPC)
    const signer = new ethers.Wallet(process.env.PRIV_KEY, provider)

    const balance = await provider.getBalance(signer.address)
console.log(ethers.utils.formatEther(balance.toString()))
    
}