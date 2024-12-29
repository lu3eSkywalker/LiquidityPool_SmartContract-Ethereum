import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-800">
      <div className="relative flex h-[130px] items-center justify-between px-6">
        <div className="flex items-center">
          <button onClick={() => router.push("/")}>
            <p className="text-4xl font-bold text-indigo-300 tracking-wide hover:text-indigo-400 transition duration-300 ease-in-out">
              Ethereum Liquidity Pool
            </p>
          </button>
        </div>

        <div className="flex space-x-4 ml-auto">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-xl font-medium text-white hover:bg-blue-600 " onClick={() => router.push('/getliquidityinfo')}>
            Current Liquidity
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;