const Web3 = require("web3");
const RPC = "wss://..."
const web3 = new Web3(RPC);
(async () => {
	const args = process.argv.slice(2);
	const contractAddress = args[0];
	const startBlock = parseInt(args[1], 10);
	const targetBlock = parseInt(args[2], 10);
	await web3.eth.net.isListening();

	console.log('========== SNAPSHOT ==========');
	console.log('Web3 is connected.');
	console.log(`Process block ${startBlock} to ${targetBlock} on ${contractAddress}`);

	console.log('\n========== CHECK TX IN BLOCKS ==========');
	let donation = {};
	for (let blockNumber = startBlock; blockNumber <= targetBlock; blockNumber++) {
		let block = await web3.eth.getBlock(blockNumber, true);
		for (let tx of block.transactions) {
			if (tx.to == contractAddress) {
				if (!donation.hasOwnProperty(tx.from)) {
					donation[tx.from] = 0;
				}
				donation[tx.from] += parseInt(tx.value, 10);
				console.log(`${blockNumber},${tx.hash},${tx.from},${tx.to},${tx.value}`);
			}
		}
	}

	console.log('\n========== SUMMARY ==========');
	for (let account in donation) {
		console.log(`${account},${donation[account]}`);
	}

	// close websocket connection
	web3.currentProvider.connection.close()
})();
