"use client";

import { useAccount, useBalance } from "wagmi";
import { Badge } from "@/components/ui/badge";

// USDC contract addresses on Base networks
const USDC_ADDRESSES = {
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet
  84532: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia
} as const;

export function BalanceDisplay() {
  const { address, isConnected, chainId } = useAccount();

  // Get ETH balance
  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address,
  });

  // Get USDC balance only if we have a valid USDC address
  const usdcAddress =
    chainId && chainId in USDC_ADDRESSES
      ? USDC_ADDRESSES[chainId as keyof typeof USDC_ADDRESSES]
      : undefined;

  const {
    data: usdcBalance,
    isLoading: usdcLoading,
    error: usdcError,
  } = useBalance({
    address,
    token: usdcAddress,
    query: {
      enabled: !!usdcAddress && !!address && !!isConnected,
    },
  });

  if (!isConnected || !address) return null;

  // Debug logs
  console.log("BalanceDisplay debug:", {
    address,
    chainId,
    usdcAddress,
    ethBalance: ethBalance
      ? { value: ethBalance.value.toString(), symbol: ethBalance.symbol }
      : null,
    usdcBalance: usdcBalance
      ? { value: usdcBalance.value.toString(), symbol: usdcBalance.symbol }
      : null,
    usdcError: usdcError?.message,
    ethLoading,
    usdcLoading,
  });

  const formatBalance = (balance: bigint, decimals: number, symbol: string) => {
    const formatted = Number(balance) / 10 ** decimals;
    return `${formatted.toFixed(4)} ${symbol}`;
  };

  // Only show one badge at a time for now to debug
  if (ethBalance && !ethLoading) {
    return (
      <Badge variant="outline" className="text-xs">
        {formatBalance(
          ethBalance.value,
          ethBalance.decimals,
          ethBalance.symbol,
        )}
      </Badge>
    );
  }

  return null;
}
