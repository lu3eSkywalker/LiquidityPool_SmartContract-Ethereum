// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {LiquidityPool} from "../src/Liquidity_Pool.sol";
import {LPToken} from "../src/LPToken.sol";
import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract DeployLiquidityPool is Script {
    function run() external returns (LiquidityPool) {
        // Replace with the actual addresses of TokenA, TokenB, and LPToken
        address tokenAAddress = <TokenAaddress>;
        address tokenBAddress = <TokenBaddress>;
        address lpTokenAddress = <LPtokenAddress>;

        // Start broadcasting (sending transactions)
        vm.startBroadcast();

        // Deploy the LiquidityPool contract with the token addresses
        LiquidityPool liquidityPool = new LiquidityPool(tokenAAddress, tokenBAddress, lpTokenAddress);

        // Stop broadcasting
        vm.stopBroadcast();

        // Return the deployed LiquidityPool contract
        return liquidityPool;
    }
}