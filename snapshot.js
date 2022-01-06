const Web3 = require("web3");
const fs = require('fs');
const { format } = require('@fast-csv/format');

(async () => {
	const args = process.argv.slice(2);
	const contractAddress = args[0];
	const startBlock = parseInt(args[1], 10);
	const targetBlock = parseInt(args[2], 10);
	const rpc = args[3];
	const totalOffer = parseInt(args[4], 10);

	const web3 = new Web3(rpc);
	await web3.eth.net.isListening();

	console.log('========== SNAPSHOT ==========');
	console.log('Web3 is connected.');
	console.log(`Process block ${startBlock} to ${targetBlock} on ${contractAddress}`);

	console.log('\n========== CHECK TX IN BLOCKS ==========');
	let donation = [];
	let totalDonation = 0;
	for (let blockNumber = startBlock; blockNumber <= targetBlock; blockNumber++) {
		let block = await web3.eth.getBlock(blockNumber, true);
		for (let tx of block.transactions) {
			if (tx.to == contractAddress) {
				let balance = parseInt(tx.value);
                donation[tx.from] = donation[tx.from]==undefined ? balance : donation[tx.from]+balance;
				console.log(`${blockNumber},${tx.hash},${tx.from},${tx.to},${tx.value}`);
				totalDonation += balance;
			}
		}
	}
	console.log(`totalDonation: ${totalDonation}`);

	console.log('\n========== SUMMARY ==========');
	const fileName = 'donation.csv';
	const csvFile = fs.createWriteStream(fileName);
	const stream = format({ headers:true });
	stream.pipe(csvFile);
	for (let account in donation) {
		let offer = donation[account]/totalDonation*totalOffer;
		console.log(`${account},${donation[account]},${offer}`);
		stream.write({ account:account, eth_donation:donation[account], lun_offer:offer });
	}
	stream.end();

	// close websocket connection
	web3.currentProvider.connection.close()

})();
