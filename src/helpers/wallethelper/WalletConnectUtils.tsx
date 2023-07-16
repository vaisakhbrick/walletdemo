import "@walletconnect/react-native-compat";
import "@ethersproject/shims";

import { Core } from "@walletconnect/core";
import { ICore } from "@walletconnect/types";
import { Web3Wallet, IWeb3Wallet } from "@walletconnect/web3wallet";

export let web3wallet: IWeb3Wallet;
export let core: ICore;
export let currentETHAddress: string;

import { useState, useCallback, useEffect } from "react";
import { createOrRestoreEIP155Wallet } from "./EIP155Wallet";
import { PROJECT_ID } from "../../constants/Constants";

async function createWeb3Wallet() {

  const { eip155Addresses } = await createOrRestoreEIP155Wallet();
  currentETHAddress = eip155Addresses[0];

  const core = new Core({
    projectId: PROJECT_ID,
  });

  // Edit the metadata to your preference
  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: "WalletDemo",
      description: "Demo wallet for connecting to dapps",
      url: "https://walletconnect.com/",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
  });
}

// Initialize the Web3Wallet
export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: unknown) {
      console.log("Error for initializing", err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  return initialized;
}

export async function web3WalletPair(params: { uri: string }) {
  return await web3wallet.core.pairing.pair({ uri: params.uri });
}

export async function getAllPairings() {
  return await web3wallet.core.pairing.getPairings()
}
