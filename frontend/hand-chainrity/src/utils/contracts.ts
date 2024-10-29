import Addresses from './contract-addresses.json'
import HandChainrity from './abis/HandChainrity.json'

import Web3 from 'web3'

//@ts-ignore
//创建web3实例
let web3 = new Web3(window.web3.currentProvider);

//修改地址为部署的合约地址
const HandChainrityAddress = Addresses.HandChainrity
const HandChainrityABI = HandChainrity.abi

const HandChainrityContract = new web3.eth.Contract(HandChainrityABI,HandChainrityAddress);

export {web3,HandChainrityContract}