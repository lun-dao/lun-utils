const Web3 = require("web3");
const RPC = "wss://..."
const web3 = new Web3(RPC);
(async () => {
	const args = process.argv.slice(2);
	const contractAddress = args[0];
	const startBlock = parseInt(args[1], 10);
	const targetBlock = parseInt(args[2], 10);
	await web3.eth.net.isListening();

	console.log('Web3 is connected.');
	console.log(`Process block ${startBlock} to ${targetBlock} on ${contractAddress}`);

	for (let blockNumber = startBlock; blockNumber <= targetBlock; blockNumber++) {
		let block = await web3.eth.getBlock(blockNumber, true);
		for (let tx of block.transactions) {
			if (tx.to == contractAddress) {
				console.log(`${blockNumber},${tx.hash},${tx.from},${tx.to},${tx.value}`);
			}
		}
	}

	// close websocket connection
	web3.currentProvider.connection.close()
})();
