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

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Overview of your activity and quick actions
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Jobs
                  </CardTitle>
                  <Badge>2</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Revenue
                  </CardTitle>
                  <Badge variant="secondary">USDC</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.34</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Nodes
                  </CardTitle>
                  <Badge variant="outline">Online</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +1 new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Success Rate
                  </CardTitle>
                  <Badge variant="destructive">Rate</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>
                    Your recent job execution history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "DEX Arbitrage",
                        status: "completed",
                        time: "2 min ago",
                      },
                      {
                        name: "MEV Frontrunner",
                        status: "running",
                        time: "5 min ago",
                      },
                      {
                        name: "Grid Trading",
                        status: "completed",
                        time: "12 min ago",
                      },
                      {
                        name: "Yield Farmer",
                        status: "failed",
                        time: "1 hour ago",
                      },
                    ].map((job, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">{job.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {job.time}
                          </p>
                        </div>
                        <Badge
                          variant={
                            job.status === "completed"
                              ? "default"
                              : job.status === "running"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View All
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Shortcuts to commonly used features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Button className="justify-start" variant="outline">
                      🚀 Execute Program
                    </Button>
                    <Button className="justify-start" variant="outline" asChild>
                      <Link href="/programs/new">📝 Create Program</Link>
                    </Button>
                    <Button className="justify-start" variant="outline" asChild>
                      <Link href="/nodes/new">🖥️ Register Node</Link>
                    </Button>
                    <Button className="justify-start" variant="outline">
                      📊 View Statistics
                    </Button>
                    <Button className="justify-start" variant="outline">
                      💰 Check Revenue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
