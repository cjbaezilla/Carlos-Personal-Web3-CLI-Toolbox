import input from '@inquirer/input'
import select from '@inquirer/select'
import confirm from '@inquirer/confirm';
import fs from 'fs'
import solc from 'solc'
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
    })

    const contractAmount = await input({ message: 'What is the amount?:' })

    const answer = await confirm({ message: 'Create and deploy this contract?' })
    
    const provider = new ethers.providers.JsonRpcProvider(targetNetworkRPC)
    const signer = new ethers.Wallet(process.env.PRIV_KEY, provider)

    //const balance = await provider.getBalance(signer.address)
    //console.log(ethers.utils.formatEther(balance.toString()))

    try {
        const baseContract = await fs.promises.readFile("./base-contracts/Storage.sol")
        //const result = baseContract.toString().replace("{{OP_NUMBER}}", contractAmount);
        //fs.writeFileSync('./user-contracts/Storage.sol', result.toString())

        const contractCompile = solc.compile(baseContract.toString(), 1)
        console.log(contractCompile)
        //fs.writeFileSync('./compiled-contracts/Storage.json', contractCompile)

    } catch (err) {
        console.error(err)
    }
    
}