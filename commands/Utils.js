import inquirer from "inquirer"
import { ethers } from "ethers"

export async function createNewWallet() {
    let addys = []

    const prompts = await inquirer.prompt([
        { name: 'address_amount', message: 'How many addresses do you want to create?:', type: 'input' }
    ])
    if(prompts.address_amount > 1) {
        for (let index = 0; index < prompts.address_amount; index++) {
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