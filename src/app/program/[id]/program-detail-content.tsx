"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { X402PaymentModal } from "@/components/payment/x402-payment-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockPrograms = [
  {
    id: "1",
    name: "DEX Arbitrage Bot",
    category: "arbitrage",
    author: "0x1234...5678",
    description:
      "Advanced arbitrage bot that exploits price differences across DEX platforms. Uses sophisticated algorithms to identify profitable opportunities while minimizing gas costs and slippage.",
    price: 0.05,
    avgRevenue: 0.5,
  },
  {
    id: "2",
    name: "MEV Frontrunner",
    category: "mev",
    author: "0x2345...6789",
    description:
      "High-frequency MEV extraction bot that monitors pending transactions and executes profitable front-running strategies.",
    price: 0.06,
    avgRevenue: 0.8,
  },
  {
    id: "3",
    name: "Lending Optimizer",
    category: "lending",
    author: "0x3456...789a",
    description:
      "Automated yield farming strategy that optimizes lending positions across multiple DeFi protocols to maximize returns.",
    price: 0.07,
    avgRevenue: 1.1,
  },
  {
    id: "4",
    name: "Grid Trading Bot",
    category: "dex",
    author: "0x4567...89ab",
    description:
      "Market making bot that places buy and sell orders in a grid pattern to profit from market volatility.",
    price: 0.08,
    avgRevenue: 1.4,
  },
  {
    id: "5",
    name: "Liquidity Sniper",
    category: "mev",
    author: "0x5678...9abc",
    description:
      "Specialized bot for sniping new token listings and liquidity additions on DEX platforms.",
    price: 0.09,
    avgRevenue: 1.7,
  },
  {
    id: "6",
    name: "Yield Farmer",
    category: "lending",
    author: "0x6789...abcd",
    description:
      "Comprehensive yield farming strategy that automatically compounds rewards and rebalances positions.",
    price: 0.1,
    avgRevenue: 2.0,
  },
];

const mockNodes = [
  {
    id: "1",
    name: "Node-001",
    region: "Tokyo",
    latency: 2,
    price: 0.1,
    uptime: 99.9,
  },
  {
    id: "2",
    name: "Node-002",
    region: "Singapore",
    latency: 3,
    price: 0.12,
    uptime: 99.8,
  },
  {
    id: "3",
    name: "Node-003",
    region: "Hong Kong",
    latency: 4,
    price: 0.11,
    uptime: 99.7,
  },
  {
    id: "4",
    name: "Node-004",
    region: "Seoul",
    latency: 5,
    price: 0.13,
    uptime: 99.6,
  },
];

export function ProgramDetailContent({ id }: { id: string }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [executionStarted, setExecutionStarted] = useState(false);

  const program =
    mockPrograms.find((p) => p.id === id) || mockPrograms[0];
  const totalCost = program.price + 0.11; // Program + Node + Platform fees

  const handlePaymentSuccess = () => {
    setExecutionStarted(true);
    // Here you would typically start the actual program execution
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <Link
                      href="/programs"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Programs
                    </Link>
                  </li>
                  <li className="text-sm text-muted-foreground">/</li>
                  <li className="text-sm font-medium">{program.name}</li>
                </ol>
              </nav>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Program Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">
                          {program.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          Created by {program.author}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          program.category === "mev"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {program.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-6">
                      {program.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Version</p>
                        <p className="font-medium">v1.{program.id}.0</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Executions
                        </p>
                        <p className="font-medium">{Number(program.id) * 42}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Avg Revenue
                        </p>
                        <p className="font-medium">{program.avgRevenue} USDC</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Success Rate
                        </p>
                        <p className="font-medium">
                          94.{9 - Number(program.id)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Node Selection */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Select TEE Node</CardTitle>
                    <CardDescription>
                      Choose the TEE node for program execution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {mockNodes.map((node, i) => (
                        <div
                          key={node.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="node"
                              value={node.id}
                              defaultChecked={i === 0}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium">{node.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {node.region} • {node.latency}ms latency
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {node.price} USDC/exec
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {node.uptime}% uptime
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                {/* Cost Estimate */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Estimate</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Program Fee
                      </span>
                      <span className="text-sm">{program.price} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Node Fee
                      </span>
                      <span className="text-sm">0.10 USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Platform Fee
                      </span>
                      <span className="text-sm">0.01 USDC</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Cost</span>
                        <span>{totalCost.toFixed(2)} USDC</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Execute Button */}
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    {executionStarted ? (
                      <Button disabled className="w-full" size="lg">
                        🔄 Executing Program...
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setIsPaymentModalOpen(true)}
                      >
                        Execute Program
                      </Button>
                    )}
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      {executionStarted
                        ? "Program is running on TEE node..."
                        : "Payment will be processed via X402 protocol"}
                    </p>
                  </CardContent>
                </Card>

                {/* Program Stats */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        24h Volume
                      </span>
                      <span className="text-sm font-medium">$12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        7d Profit
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        +$234.50
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Executions
                      </span>
                      <span className="text-sm font-medium">
                        {Number(program.id) * 42}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Avg Runtime
                      </span>
                      <span className="text-sm font-medium">
                        {15 + Number(program.id) * 5}s
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* X402 Payment Modal */}
      <X402PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        programName={program.name}
        totalCost={totalCost}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}