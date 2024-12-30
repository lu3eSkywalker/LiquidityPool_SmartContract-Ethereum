# Liquidity Pool Smart Contract
This project provides a simple Liquidity Pool contract written in Solidity, enabling the creation of liquidity pools and the issuance of Liquidity Pool Tokens (LST) when liquidity is provided. The contract supports:

### Adding Liquidity: 
Users can provide liquidity and receive LST tokens in return.
### Removing Liquidity: 
Users can redeem LST tokens to remove their liquidity.
### Current Liquidity Tracking: 
View the current liquidity of the contract.
Additionally, a frontend interface is provided for seamless interaction with the smart contract.

## Getting Started
### Get Token Addresses
Identify or deploy the addresses for Token A and Token B to use in the liquidity pool.

## Deploy LST Token
Deploy the Liquidity Pool Token (LST) and note its contract address.

## Replace Contract Addresses
Update the script script/DeployLiquidityPool.s.sol with the correct addresses for Token A, Token B, and the LST token.

## Deployed Contract Addresses (Example)
For reference, here are the deployed contract addresses for this project:

#### Token A Address: 0xb86Eaa036a19F55744aB15c47f05B72Db5e52428
#### Token B Address: 0x13dec0A47f9b910A8C186b342017d1e1Bc37f5C6
#### LST Token Address: 0x8A2e3a63D6dc8430a5FBAC8a48865C4c61C22395



## Deployment Commands
Here are the commands to deploy the components using Foundry:

### Deploy ERC20 Tokens
forge script script/DeployERC20.s.sol --broadcast --rpc-url $RPC_URL --private-key $PRIVATE_KEY --gas-limit 10000000


### Deploy Liquidity Pool Token (LST)
forge script script/DeployLPToken.s.sol --broadcast --rpc-url $RPC_URL --private-key $PRIVATE_KEY --gas-limit 10000000



### Deploy Liquidity Pool
forge script script/DeployLiquidityPool.s.sol --broadcast --rpc-url $RPC_URL --private-key $PRIVATE_KEY --gas-limit 10000000


## Frontend Interaction
A frontend application is included to interact with the deployed smart contracts. The frontend allows users to:

- Add liquidity by providing Token A and Token B.
- Remove liquidity and redeem LST tokens.
- View the current liquidity of the pool.

#### For integration, ensure that the frontend is configured with the appropriate contract addresses.


