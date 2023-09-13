import input from '@inquirer/input'
import select from '@inquirer/select'
import confirm from '@inquirer/confirm';
import fs from 'fs'
import solc from 'solc'
import { ethers, ContractFactory } from "ethers"

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

export async function createNewNFTContract() {

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

        //add solidity version to compiler args
        var inputt = {
            language: 'Solidity',
            sources: {
              'Storage.sol': {
                content: baseContract.toString()
              }
            },
            settings: {
              outputSelection: {
                '*': {
                  '*': ['*']
                }
              }
            }
          }

          const output = JSON.parse(solc.compile(JSON.stringify(inputt)))
          const abi = output.contracts['Storage.sol'].Storage.abi
          const bytecode = output.contracts['Storage.sol'].Storage.evm.bytecode

          fs.writeFileSync('./compiled-contracts/Storage.json', JSON.stringify(abi))

          const factory = new ContractFactory(abi, bytecode, signer);

            const contract = await factory.deploy(222,signer.address);

            //save deploy info on logs
            console.log(contract.address);
            console.log(contract.deployTransaction);


    } catch (err) {
        console.error(err)
    }
    
}