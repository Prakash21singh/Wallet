import React from "react";
import CoinflipGame from "./CoinflipGame";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function App() {
  return (
    <div className="w-full h-screen ">
      <header className="flex justify-between p-4 bg-dark-1 text-white">
        <h1 className="text-3xl text-or-1">Coinflip Game</h1>
        <WalletMultiButton />
      </header>
      <main>
        <CoinflipGame />
      </main>
    </div>
  );
}

export default App;
