import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const RemoveLiquidity = () => {

  const [liquidityToRemove, setLiquidityToRemove] = useState<string>("");
  const [liquidityRemoved, setLiquidityRemoved] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const contractAddress = "0x6824103731A6e30868AfDE9b8D4f9a9DF4ec2Fea";

  const ABI = [
    "function removeLiquidity(uint256) external returns (uint256, uint256)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contractAdd = new ethers.Contract(
    contractAddress || "0x6824103731A6e30868AfDE9b8D4f9a9DF4ec2Fea",
    ABI,
    provider
  );

  async function removeLiquidity() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAdd || "", ABI, signer);

        const weiToEth = ethers.parseUnits(liquidityToRemove, 18);

        const removeLiquidityFromPool = await contract.removeLiquidity(
          weiToEth
        );

        setLoadingBar(true);
        const res = await removeLiquidityFromPool.wait();
        setLoadingBar(false);

        if (res.status == 1) {
          setLiquidityRemoved("Transaction Successful");
        }
        console.log(removeLiquidityFromPool);
      } catch (error) {
        console.error("Error removing liquidity", error);
        alert(
          "An error occurred while removing the liquidity. Check console for details."
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
                    placeholder="Liquidity"
                    onChange={(e) =>
                      setLiquidityToRemove(e.target.value)
                    }
                  />
                </label>
            </div>

            <br />

            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
              onClick={() => removeLiquidity()}
            >
              Remove Liquidity
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
            {<div className="text-xl">{liquidityRemoved}</div>}
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
          <li className="step step-primary">
            <a href="./removeliquidity">Remove Liquidity</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RemoveLiquidity;