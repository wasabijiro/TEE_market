"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const networks = [
  {
    chain: base,
    name: "Base",
    color: "bg-blue-500",
  },
  {
    chain: baseSepolia,
    name: "Base Sepolia",
    color: "bg-orange-500",
  },
];

export function NetworkSelector() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  if (!isConnected) return null;

  const currentNetwork = networks.find((n) => n.chain.id === chainId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${currentNetwork?.color || "bg-gray-500"}`}
          />
          {currentNetwork?.name || "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {networks.map(({ chain, name, color }) => (
          <DropdownMenuItem
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            className="flex items-center gap-2"
          >
            <div className={`w-2 h-2 rounded-full ${color}`} />
            {name}
            {chainId === chain.id && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
