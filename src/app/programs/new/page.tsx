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

export default function NewProgramPage() {
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
                      href="/programs"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Programs
                    </Link>
                  </li>
                  <li className="text-sm text-muted-foreground">/</li>
                  <li className="text-sm font-medium">Create New Program</li>
                </ol>
              </nav>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold">Create Trading Program</h1>
                <p className="mt-2 text-muted-foreground">
                  Upload and monetize your secure trading bot program
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Details</CardTitle>
                      <CardDescription>
                        Provide information about your trading program
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">
                            Program Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., DEX Arbitrage Bot"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <select className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                            <option value="">Select Category</option>
                            <option value="arbitrage">Arbitrage</option>
                            <option value="dex">DEX Trading</option>
                            <option value="lending">Lending/Yield</option>
                            <option value="mev">MEV</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe your trading strategy, expected returns, risk factors..."
                          rows={4}
                          className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="text-sm font-medium">Version</label>
                          <input
                            type="text"
                            placeholder="1.0.0"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Min Memory (GB)
                          </label>
                          <input
                            type="number"
                            placeholder="4"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Est. Runtime (sec)
                          </label>
                          <input
                            type="number"
                            placeholder="30"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Supported TEE Types
                        </label>
                        <div className="mt-2 flex gap-2">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Intel SGX</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">ARM TrustZone</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">AMD SEV</span>
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Pricing & Revenue</CardTitle>
                      <CardDescription>
                        Set your monetization strategy
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">
                            Base Price (USDC)
                          </label>
                          <input
                            type="number"
                            step="0.001"
                            placeholder="0.05"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Price per execution
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Revenue Share (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            placeholder="10"
                            className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Percentage of user profits
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Program Upload</CardTitle>
                      <CardDescription>
                        Upload your encrypted program files
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">
                          Docker Image
                        </label>
                        <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <p className="text-sm text-muted-foreground">
                            Upload your Docker image containing the program
                          </p>
                          <Button variant="outline" className="mt-2">
                            Choose File
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">
                          Configuration File (Optional)
                        </label>
                        <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <p className="text-sm text-muted-foreground">
                            Upload configuration template for users
                          </p>
                          <Button variant="outline" className="mt-2">
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 flex gap-4">
                    <Button size="lg">Create Program</Button>
                    <Button variant="outline" asChild>
                      <Link href="/programs">Cancel</Link>
                    </Button>
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Program Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="text-sm">
                            TEE-compatible compilation
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="text-sm">
                            No external dependencies
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="text-sm">
                            Deterministic execution
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                          <span className="text-sm">
                            Risk disclosure required
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                          <span className="text-sm">Audit recommended</span>
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
