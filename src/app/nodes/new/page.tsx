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

export default function RegisterNodePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <Link
                      href="/nodes"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Nodes
                    </Link>
                  </li>
                  <li className="text-sm text-muted-foreground">/</li>
                  <li className="text-sm font-medium">Register New Node</li>
                </ol>
              </nav>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold">Register TEE Node</h1>
                <p className="mt-2 text-muted-foreground">
                  Register your Trusted Execution Environment node to start
                  earning rewards
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Node Information</CardTitle>
                      <CardDescription>
                        Provide details about your TEE node
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">
                            Node Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Tokyo-Node-001"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            TEE Type
                          </label>
                          <select className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                            <option value="">Select TEE Type</option>
                            <option value="sgx">Intel SGX</option>
                            <option value="trustzone">ARM TrustZone</option>
                            <option value="sev">AMD SEV</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe your node's capabilities and location..."
                          rows={3}
                          className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="text-sm font-medium">
                            CPU Cores
                          </label>
                          <input
                            type="number"
                            placeholder="8"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Memory (GB)
                          </label>
                          <input
                            type="number"
                            placeholder="32"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Storage (GB)
                          </label>
                          <input
                            type="number"
                            placeholder="1000"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">Region</label>
                          <select className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                            <option value="">Select Region</option>
                            <option value="asia">Asia Pacific</option>
                            <option value="us">North America</option>
                            <option value="eu">Europe</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">City</label>
                          <input
                            type="text"
                            placeholder="Tokyo"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Price per Hour (USDC)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.50"
                          className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>


                  <div className="mt-6 flex gap-4">
                    <Button size="lg">Register Node</Button>
                    <Button variant="outline" asChild>
                      <Link href="/nodes">Cancel</Link>
                    </Button>
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="text-sm">TEE-capable hardware</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="text-sm">
                            Stable internet connection
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="text-sm">24/7 availability</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Earnings Potential
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Avg. per day
                          </span>
                          <span className="text-sm font-medium">$24-48</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Avg. per month
                          </span>
                          <span className="text-sm font-medium">$720-1440</span>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            *Estimates based on current market demand
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
