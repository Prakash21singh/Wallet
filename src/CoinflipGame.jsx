import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const CoinflipGame = () => {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("heads");
  const [result, setResult] = useState(null);

  const handleFlip = () => {
    const outcome = Math.random() < 0.5 ? "heads" : "tails";
    setResult(outcome === side ? "🟢 You Win!" : "🔴You Lose!");
  };

  const handleBet = async () => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    handleFlip();

    // Implement token transfer logic here based on the result
    // Use Solana's web3.js to interact with the blockchain
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-2  text-white">
      <h1 className="text-4xl font-bold mb-6 text-or-1">Coinflip Game</h1>
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2  bg-dark-1 w-96 text-white rounded-lg outline-none outline-or-1 shadow-sm shadow-slate-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Choose Side:</label>
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="p-2 text-white w-96 bg-dark-1 rounded-lg outline-or-1 outline-none">
          <option value="heads">
            <p className="p-5">Heads</p>
          </option>
          <option value="tails" className="h-5">
            Tails
          </option>
        </select>
      </div>
      <button
        onClick={handleBet}
        className="bg-violet-700 font-bold   px-6 py-2 rounded text-xl ">
        Flip Coin
      </button>
      {result && <div className="mt-6 text-2xl font-bold">{result}</div>}
    </div>
  );
};

export default CoinflipGame;
