import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletButton } from "@/components/wallet/wallet-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/logo.png"
                alt="TEE Edge Market"
                width={128}
                height={128}
                className="h-32 w-32 animate-pulse"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-6xl">
              TEE Edge Market
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Distributed TEE node marketplace for secure trading bot execution.
              Execute bots safely on Trusted Execution Environment to maximize
              profits.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/nodes">Browse Nodes</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/50 py-16">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why TEE Edge Market?
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Innovative solution solving traditional cloud and local
                execution challenges
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🔒 Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Execute encrypted private keys and trading strategies
                      using TEE technology. Even platform operators cannot see
                      the contents.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      ⚡ Low Latency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Execute near exchange APIs on edge nodes to achieve
                      millisecond-level high-speed trading.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      💰 Cost Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      On-demand billing for execution only when needed.
                      Significantly reduce always-on operational costs.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🖥️ Node Providers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Monetize your idle TEE hardware by providing compute
                      resources to the network and earning passive income.
                    </CardDescription>
                    <Button asChild className="mt-4 w-full" variant="outline">
                      <Link href="/nodes/new">Register Node</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📝 Program Creators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Monetize your trading algorithms by creating secure
                      programs that execute on TEE nodes while protecting your
                      IP.
                    </CardDescription>
                    <Button asChild className="mt-4 w-full" variant="outline">
                      <Link href="/programs/new">Create Program</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Platform Statistics
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary">147</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Active Nodes
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">23</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Programs
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">1.2K</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Executions/Day
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">99.9%</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Get Started Now
              </h2>
              <p className="mt-6 text-lg leading-8 opacity-90">
                Connect your wallet to experience the power of TEE Edge Market
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="flex items-center">
                  <WalletButton />
                </div>
                <Button
                  variant="ghost"
                  asChild
                  size="lg"
                  className="text-primary-foreground hover:text-primary-foreground/80"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-primary rounded" />
              <span className="font-semibold">TEE Edge Market</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TEE Edge Market. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
