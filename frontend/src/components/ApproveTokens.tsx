import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const ApproveTokens = () => {
  const [token0, setToken0] = useState<string>(
    "0xb86Eaa036a19F55744aB15c47f05B72Db5e52428"
  );
  const [token1, setToken1] = useState<string>(
    "0x13dec0A47f9b910A8C186b342017d1e1Bc37f5C6"
  );
  const [liquidityPoolAddress, setLiquidityPoolAddress] = useState<string>(
    "0x6824103731A6e30868AfDE9b8D4f9a9DF4ec2Fea"
  );

  const [value0, setValue0] = useState<string>("");
  const [value1, setValue1] = useState<string>("");
  const [token0Approved, setToken0Approved] = useState<boolean>(false);
  const [token1Approved, setToken1Approved] = useState<boolean>(false);

  const ABI = ["function approve(address, uint256) public returns (bool)"];

  async function approveToken0() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(token0, ABI, signer);

        const correctedLiquidityPoolAddress =
          ethers.getAddress(liquidityPoolAddress);

        const weiToEth = ethers.parseUnits(value0, 18);

        const approveToken = await contract.approve(
          correctedLiquidityPoolAddress,
          weiToEth
        );
        console.log(approveToken);

        const response = await approveToken.wait();
        if (response.status == 1) {
          setToken0Approved(true);
        }
      } catch (error) {
        console.error("Error Creating Pool", error);
        alert(
          "An error occurred while creating the liquidity pool. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  async function approveToken1() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(token1, ABI, signer);

        const correctedLiquidityPoolAddress =
          ethers.getAddress(liquidityPoolAddress);

        const weiToEth = ethers.parseUnits(value1, 18);

        const approveToken = await contract.approve(
          correctedLiquidityPoolAddress,
          weiToEth
        );
        const response = await approveToken.wait();
        if (response.status == 1) {
          setToken1Approved(true);
        }
      } catch (error) {
        console.error("Error Creating Pool", error);
        alert(
          "An error occurred while creating the liquidity pool. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-[700px] bg-gray-200">
        <div className="relative bg-white shadow-md rounded-lg p-8 w-[950px] mb-6">
          <div>
            <label className="input input-bordered flex items-center gap-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Liquidity Pool Address"
                onChange={(e) => setLiquidityPoolAddress(e.target.value)}
              />
            </label>
          </div>

          <div className="flex items-center mb-4">
            <label className="input input-bordered flex items-center gap-2 my-4 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Token 0 address"
                onChange={(e) => setToken0(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mx-2 font-black text-xl">
              Value
              <input
                type="number"
                className="grow"
                placeholder="Token 0 value"
                onChange={(e) => setValue0(e.target.value)}
              />
            </label>

            <button
              onClick={() => approveToken0()}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-2 font-bold text-xl"
            >
              Approve
            </button>

            {token0Approved ? (
              <div>
                {" "}
                <div className="p-2">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-success"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex items-center mb-4">
            <label className="input input-bordered flex items-center gap-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Token 1 address"
                onChange={(e) => setToken1(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mx-2 font-black text-xl">
              Value
              <input
                type="number"
                className="grow"
                placeholder="Token 1 value"
                onChange={(e) => setValue1(e.target.value)}
              />
            </label>

            <br />
            <br />

            <button
              onClick={() => approveToken1()}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-2 font-bold text-xl"
            >
              Approve
            </button>

            {token1Approved ? (
              <div>
                {" "}
                <div className="p-2">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-success"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-700 font-medium h-[200px] bg-gray-200">
        <ul className="steps text-xl">
        <li className="step step-primary">
            <a href="./approvetokens">Approve Tokens</a>
          </li>
          <li className="step">
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

export default ApproveTokens;
