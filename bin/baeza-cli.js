#! /usr/bin/env node
import { createNewWallet, createNewNFTContract } from "../commands/Utils.js"
import { Command } from 'commander'
const program = new Command()

program
  .name('baeza-cli')
  .description('Pacifier Studio Interactive Toolbox For Creators')
  .version('1.0.0')

program.command('create-wallet')
  .description('create wallets on demand depending on your needs.')
  .action(() => {
    createNewWallet()
  })

program.command('create-contract')
  .description('creates and publish a custom ERC721A contract for your project.')
  .action(() => {
    createNewNFTContract()
  })

program.command('watch')
  .description('verifies that the installation and the configuration files are ok.')
  .argument('<environment>', 'environment to watch')
  .option('-f, --first <char>', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((environment, options) => {
    createNewWallet()
    //console.log(options)
    //console.log(environment)
    //const limit = options.first ? 1 : undefined;
    //console.log(str.split(options.separator, limit));
  })


program.command('upload')
  .description('upload your project metadata files to IPFS/Arweave.')
  //.argument('<strings...>', 'one or more strings')
  //.option('-s, --separator <char>', 'separator character', ',')
  .action((strings, options) => {
    console.log(options)
    console.log(strings)
    //console.log(strings.join(options.separator));
  })

program.command('mint')
  .description('creates a custom front end web aplication to host your NFT sale.')
  //.argument('<strings...>', 'one or more strings')
  //.option('-s, --separator <char>', 'separator character', ',')
  .action((strings, options) => {
    console.log(options)
    console.log(strings)
    //console.log(strings.join(options.separator));
  })

  program.parse()


