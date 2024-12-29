import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const RemoveLiquidity = () => {
  const [contractAddress, setContractAddress] = useState<string>(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  );

  const [liquidityToRemove, setLiquidityToRemove] = useState<number>(0);
  const [liquidityRemoved, setLiquidityRemoved] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

  const ABI = [
    "function removeLiquidity(uint256) external returns (uint256, uint256)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contractAdd = new ethers.Contract(
    contractAddress || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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

        const removeLiquidityFromPool = await contract.removeLiquidity(
          liquidityToRemove
        );

        setLoadingBar(true);
        const res = await removeLiquidityFromPool.wait();
        setLoadingBar(false);

        if (res.status == 1) {
          setLiquidityRemoved("Transaction Successful");
        }
        console.log(removeLiquidityFromPool);
      } catch (error: any) {
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
                      setLiquidityToRemove(parseInt(e.target.value))
                    }
                  />
                </label>
            </div>

            <br />

            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
              onClick={() => removeLiquidity()}
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
            {<div className="text-xl">{liquidityRemoved}</div>}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-700 font-medium h-[200px] bg-gray-200">
        <ul className="steps text-xl">
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