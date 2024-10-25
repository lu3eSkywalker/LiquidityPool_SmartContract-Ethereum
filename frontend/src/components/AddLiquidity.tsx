import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const AddLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const [tokenAQuantity, setTokenAQuantity] = useState<number>(0);
  const [tokenBQuantity, setTokenBQuantity] = useState<number>(0);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function addLiquidity(uint256, uint256) external returns (uint256)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contractAdd = new ethers.Contract(contractAddress || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", ABI, provider);

  async function addLiquidity() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAdd || "", ABI, signer);

        const sendTokens = await contract.addLiquidity(tokenAQuantity, tokenBQuantity);
        console.log(sendTokens);
      } catch (error: any) {
        console.error("Error Adding liquidity", error);
        alert(
          "An error occurred while adding liquidity. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <div>
          <input
            type="number"
            placeholder="Token A Quantity"
            onChange={(e) => setTokenAQuantity(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <br />

          <input
            type="number"
            placeholder="Token B Quantity"
            onChange={(e) => setTokenBQuantity(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button onClick={() => addLiquidity()}>
          Initialize the contract
        </button>

        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default AddLiquidity;