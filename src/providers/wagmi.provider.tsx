import { config } from "@/configs/wagmi.config";
import { IBaseProps } from "@/types/global.types";
import React from "react";
import { WagmiProvider as DefaultWagmiProvider } from "wagmi";

const WagmiProvider = ({ children }: IBaseProps) => {
  return (
    <DefaultWagmiProvider config={config}>{children}</DefaultWagmiProvider>
  );
};

export default WagmiProvider;
