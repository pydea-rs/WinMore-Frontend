import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  rabbyWallet,
  metaMaskWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const connectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets: [rabbyWallet, metaMaskWallet, phantomWallet],
    },
  ],
  { appName: "Winmore", projectId: "YOUR_PROJECT_ID" }
);

export const config = createConfig({
  chains: [
    // mainnet,
    sepolia,
  ],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
  connectors,
});
