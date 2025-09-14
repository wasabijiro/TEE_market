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

export default function NodesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">TEE Nodes</h1>
                <p className="mt-2 text-muted-foreground">
                  Browse available Trusted Execution Environment (TEE) nodes
                </p>
              </div>
              <Button asChild>
                <Link href="/nodes/new">Register Node</Link>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="outline">147 Nodes Available</Badge>
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Mock node cards */}
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Node-{String(i + 1).padStart(3, "0")}
                      </CardTitle>
                      <Badge variant="secondary">Online</Badge>
                    </div>
                    <CardDescription>
                      High-performance TEE node - Tokyo region
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">TEE Type:</span>
                        <span>Intel SGX</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Latency:</span>
                        <span>{2 + i}ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span>99.{9 - i}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span>{0.1 + i * 0.05} USDC/exec</span>
                      </div>
                      <Button className="w-full mt-4">View Details</Button>
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
