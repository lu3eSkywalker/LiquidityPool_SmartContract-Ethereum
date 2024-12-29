import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const AddLiquidity = () => {

  const [tokenAQuantity, setTokenAQuantity] = useState<string>("");
  const [tokenBQuantity, setTokenBQuantity] = useState<string>("");

  const [liquidityAdded, setLiquidityAdded] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const contractAddress = "0x6824103731A6e30868AfDE9b8D4f9a9DF4ec2Fea";

  const ABI = [
    "function addLiquidity(uint256, uint256) external returns (uint256)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contractAdd = new ethers.Contract(
    contractAddress || "0x6824103731A6e30868AfDE9b8D4f9a9DF4ec2Fea",
    ABI,
    provider
  );

  async function addLiquidity() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAdd || "", ABI, signer);

        const weiToEth = ethers.parseUnits(tokenAQuantity, 18);
        const weiToEth2 = ethers.parseUnits(tokenBQuantity, 18);

        setLoadingBar(true);
        const sendTokens = await contract.addLiquidity(
          weiToEth,
          weiToEth2
        );
        setLoadingBar(false);
        console.log(sendTokens);

        setLoadingBar(true);
        const res = await sendTokens.wait();
        setLoadingBar(false);

        if (res.status == 1) {
          setLiquidityAdded("Transaction Successful");
        }
      } catch (error) {
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
    <div>
      <div className="flex justify-center items-center h-[700px] bg-gray-200">
        <div className="bg-white shadow-md rounded-lg p-8 w-150">
          <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
            <div>
              <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                Quantity:
                <input
                  className="grow"
                  type="number"
                  placeholder="Token A Quantity"
                  onChange={(e) => setTokenAQuantity(e.target.value)}
                />
              </label>

              <br />

              <label className="input input-bordered flex items-center gap-2 font-black text-xl border-4">
                Quantity:
                <input
                  className="grow"
                  type="number"
                  placeholder="Token B Quantity"
                  onChange={(e) => setTokenBQuantity(e.target.value)}
                />
              </label>
            </div>

            <br />

            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
              onClick={() => addLiquidity()}
            >
              Add Liquidity
            </button>

            <br />

            {loadingBar ? (
              <div>
                <div className="font-bold mx-[90px]">
                  Transaction Processing...
                </div>
                <div className="mx-[85px]">
                  <progress className="progress w-56"></progress>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {<div className="text-xl">{liquidityAdded}</div>}
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-700 font-medium h-[200px] bg-gray-200">
        <ul className="steps text-xl">
        <li className="step step-primary">
            <a href="./approvetokens">Approve Tokens</a>
          </li>
          <li className="step step-primary">
            <a href="./addliquidity">Add Liquidity</a>
          </li>
          <li className="step">
            <a href="./removeliquidity">Remove Liquidity</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddLiquidity;