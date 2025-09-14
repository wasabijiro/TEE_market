import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">Program Marketplace</h1>
                <p className="mt-2 text-muted-foreground">
                  Discover secure trading bot programs
                </p>
              </div>
              <Button asChild>
                <Link href="/programs/new">Create Program</Link>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="outline">23 Programs Available</Badge>
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Mock program cards */}
              {[
                {
                  name: "DEX Arbitrage Bot",
                  category: "arbitrage",
                  author: "0x1234...5678",
                },
                {
                  name: "MEV Frontrunner",
                  category: "mev",
                  author: "0x2345...6789",
                },
                {
                  name: "Lending Optimizer",
                  category: "lending",
                  author: "0x3456...789a",
                },
                {
                  name: "Grid Trading Bot",
                  category: "dex",
                  author: "0x4567...89ab",
                },
                {
                  name: "Liquidity Sniper",
                  category: "mev",
                  author: "0x5678...9abc",
                },
                {
                  name: "Yield Farmer",
                  category: "lending",
                  author: "0x6789...abcd",
                },
              ].map((program, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{program.name}</CardTitle>
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
                    <CardDescription>By {program.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version:</span>
                        <span>v1.{i + 1}.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Executions:
                        </span>
                        <span>{(i + 1) * 42}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Avg Revenue:
                        </span>
                        <span>{0.5 + i * 0.3} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span>{0.05 + i * 0.01} USDC</span>
                      </div>
                      <Button className="w-full mt-4" asChild>
                        <Link href={`/program/${i + 1}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
