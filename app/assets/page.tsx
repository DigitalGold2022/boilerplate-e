"use client";
import React, { useState, useEffect } from "react";
import { useWallet } from "littlefish-nft-auth-framework";

const CardComponent = () => {
  const { assets, isConnected, decodeHexToAscii } = useWallet();
  const [walletAssets, setWalletAssets] = useState([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    setWalletAssets(decodeHexToAscii(assets) || []);
  }, [assets]);

  return isConnected ? (
    <div className="mt-16 flex flex-wrap -mx-2 margin-top:5px">
      {assets &&
        walletAssets &&
        walletAssets.map((item, index) => (
          <div
            key={index}
            className="p-2 w-1/4"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="bg-black shadow-md rounded-lg px-4 py-4">
              <h2 className="text-center font-bold text-xs mb-4 text-electric-violet-500">
                PolicyID: {item[0]}
              </h2>
              {hoverIndex === index ? (
                <React.Fragment>
                  <p className="text-gray-600">Name: {assets[index][1]}</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="text-gray-600">Name: {item[1]}</p>
                </React.Fragment>
              )}
              <p className="text-gray-600">Amount: {item[2]}</p>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl">
        You need to connect a Cardano wallet to view your assets
      </h2>
    </div>
  );
};

export default CardComponent;