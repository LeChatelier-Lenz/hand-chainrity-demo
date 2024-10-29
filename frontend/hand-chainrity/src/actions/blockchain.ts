import {web3} from '../utils/contracts';


export const fetchTransactions = async(account:string) => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const transactions = [] as any;
    for (let i = latestBlockNumber; i >= latestBlockNumber - BigInt(100) && i>=0; i--) { // 获取最近100个区块
        const block = await web3.eth.getBlock(i, true); // 设置为 true 以获取交易信息
        if (block && block.transactions) {
            block.transactions.forEach(tx => {
                if (typeof tx === 'object' && (tx.from.toLowerCase() === account.toLowerCase() || 
                    tx.to?.toLowerCase() === account.toLowerCase())) {
                    transactions.push(tx);
                }
            });
        }
    }
    console.log(transactions);
    return transactions;
}
