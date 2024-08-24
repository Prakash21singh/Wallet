import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const CoinflipGame = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("heads");
  const [result, setResult] = useState(null);

  const TOKEN_MINT_ADDRESS = new PublicKey(
    "4T9nwW9ipyr1wW63MH9kbsPCuiFgnw9ZTDYht7H7ntEJ"
  ); // Replace with your token's mint address
  console.log(TOKEN_MINT_ADDRESS.toBase58());
  const handleFlip = async () => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const randomFlip = Math.random() < 0.5 ? "heads" : "tails";
    const didWin = randomFlip === side;

    if (didWin) {
      try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Ensure user token account exists
        const userTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          TOKEN_MINT_ADDRESS,
          publicKey
        );

        // Ensure destination token account exists
        const destinationAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          TOKEN_MINT_ADDRESS,
          publicKey
        );

        console.log(
          "User Token Account Address:",
          userTokenAccount.address.toBase58()
        );
        console.log(
          "Destination Account Address:",
          destinationAccount.address.toBase58()
        );

        const amountToTransfer = BigInt(amount * 2 * 1000000000); // Adjust decimals based on token's precision
        const tx = new Transaction().add(
          transfer(
            connection,
            userTokenAccount.address,
            destinationAccount.address,
            publicKey,
            [],
            amountToTransfer
          )
        );

        const signature = await sendTransaction(tx, connection);
        await connection.confirmTransaction(signature, "confirmed");

        alert("Congratulations, you won!");
      } catch (error) {
        console.error("Transaction error:", error);
        alert("Transaction failed. Please try again.");
      }
    } else {
      alert("You lost!");
    }
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

    await handleFlip();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-2 text-white">
      <h1 className="text-4xl font-bold mb-6 text-or-1">Coinflip Game</h1>
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 bg-dark-1 w-96 text-white rounded-lg outline-none outline-or-1 shadow-sm shadow-slate-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Choose Side:</label>
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="p-2 text-white w-96 bg-dark-1 rounded-lg outline-or-1 outline-none">
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </div>
      <button
        onClick={handleBet}
        className="bg-violet-700 font-bold px-6 py-2 rounded text-xl">
        Flip Coin
      </button>
      {result && <div className="mt-6 text-2xl font-bold">{result}</div>}
    </div>
  );
};

export default CoinflipGame;
