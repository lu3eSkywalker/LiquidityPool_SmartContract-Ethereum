// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import {Script} from "forge-std/Script.sol";
import {LPToken} from "../src/LPToken.sol"; // Adjust the import path based on your directory structure;

contract DeployLPToken is Script {
    function run() external returns (LPToken) {
        // Start the deployment process
        vm.startBroadcast();

        // Deploy the LPToken contract
        LPToken lpToken = new LPToken();

        // Stop the deployment process
        vm.stopBroadcast();

        // Return the deployed LPToken contract instance
        return lpToken;
    }
}