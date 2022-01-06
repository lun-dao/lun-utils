# LunDAO utils

## Snapshot tool - snapshot.js

This script calcaute the ETH donation amount and LUN offer amount by each account during TGE.
After calculation was finished, a csv file with name `donation.csv` will be generated.

### Requirement

Please replace the RPC url with your own RPC node.

```bash
# Install the deps
npm install web3 fast-csv

# Run with the contract address, start block, target block, RPC url, and initial LUN offer amount.
node snapshot.js 0x5Ab62C4Eefb34E8E162e651Ea371410426454275 13942543 13942556 https://... 10000

# Expected output
========== SNAPSHOT ==========
Web3 is connected.
Process block 13942543 to 13942556 on 0x5Ab62C4Eefb34E8E162e651Ea371410426454275

========== CHECK TX IN BLOCKS ==========
13942543,0x7806098fd95428e16cf04eb40552f96908eb27158cd62c5358d92071b473ac57,0x9Bd64bE9027c44D7a0d6aaF02BD7761a38a52d59,0x5Ab62C4Eefb34E8E162e651Ea371410426454275,1000000000000000000
13942556,0xbc858b47ffdfeb2de1f1409c96384efb9015d98d42ded541370a3e6ffa441fc1,0x9Bd64bE9027c44D7a0d6aaF02BD7761a38a52d59,0x5Ab62C4Eefb34E8E162e651Ea371410426454275,9000000000000000000

========== SUMMARY ==========
0x9Bd64bE9027c44D7a0d6aaF02BD7761a38a52d59,10000000000000000000
```
