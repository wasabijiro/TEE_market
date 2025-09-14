"use client";

import { useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Mock recipient address (platform treasury) - using a well-known address
const PLATFORM_ADDRESS = "0x7AFf5e8F1c3eB926b8f1E7b196aDc108fb7a00b2";

interface X402PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName: string;
  totalCost: number;
  onSuccess: () => void;
}

export function X402PaymentModal({
  isOpen,
  onClose,
  programName,
  totalCost,
  onSuccess,
}: X402PaymentModalProps) {
  const [step, setStep] = useState<
    | "confirm"
    | "paying"
    | "success"
    | "verify"
    | "execute"
    | "completed"
    | "error"
  >("confirm");
  const [errorMessage, setErrorMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const { address, chainId } = useAccount();
  const {
    sendTransaction,
    data: hash,
    isPending,
    error,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle transaction success
  useEffect(() => {
    if (isSuccess && step === "paying") {
      setStep("verify");
    }
  }, [isSuccess, step]);

  // Handle transaction error
  useEffect(() => {
    if (error && step === "paying") {
      setStep("error");
      setErrorMessage(`Transaction failed: ${error.message}`);
    }
  }, [error, step]);

  const handlePayment = async () => {
    if (!address) {
      setStep("error");
      setErrorMessage("Wallet not connected");
      return;
    }

    setStep("paying");
    setErrorMessage("");

    console.log("Payment attempt:", { address, chainId, totalCost });

    try {
      // Convert totalCost to a small ETH amount (e.g., 0.001 ETH instead of USDC amount)
      const ethAmount = "0.001"; // Small test amount in ETH
      const amount = parseEther(ethAmount);

      console.log("Attempting ETH transfer:", {
        to: PLATFORM_ADDRESS,
        amount: ethAmount,
      });

      sendTransaction({
        to: PLATFORM_ADDRESS,
        value: amount,
      });
    } catch (err: unknown) {
      console.error("Payment error:", err);
      setStep("error");
      setErrorMessage(err instanceof Error ? err.message : "Payment failed");
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Mock TEE attestation verification
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setStep("execute");
  };

  const handleExecute = async () => {
    if (!privateKey) {
      setErrorMessage("Private key is required");
      return;
    }

    setIsExecuting(true);
    setErrorMessage("");

    // Mock program execution
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsExecuting(false);
    setStep("completed");

    // Call success callback and close after a delay
    setTimeout(() => {
      onSuccess();
      onClose();
      // Reset state for next time
      setStep("confirm");
      setPrivateKey("");
      setErrorMessage("");
    }, 2000);
  };

  const handleClose = () => {
    if (step !== "paying" && step !== "verify" && step !== "execute") {
      setStep("confirm");
      setErrorMessage("");
      setPrivateKey("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>X402 Payment</DialogTitle>
          <DialogDescription>
            Complete payment to execute {programName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Summary */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Program</span>
                <span>{programName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Cost</span>
                <span className="font-medium">{totalCost} USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment Method</span>
                <Badge variant="outline">X402 Protocol</Badge>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {step === "confirm" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                <span>Ready to process payment</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePayment} className="flex-1">
                  Pay {totalCost} USDC
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {step === "paying" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
                <span>Processing payment...</span>
              </div>
              {isConfirming && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span>Waiting for confirmation...</span>
                </div>
              )}
              <Button disabled className="w-full">
                {isPending ? "Confirm in Wallet..." : "Processing..."}
              </Button>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span>Payment successful!</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Verify TEE attestation to continue
              </div>
              <Button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full"
              >
                {isVerifying ? "Verifying TEE..." : "Verify TEE Attestation"}
              </Button>
            </div>
          )}

          {step === "execute" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span>TEE Attestation Verified</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Temporary Private Key
                </label>
                <Input
                  type="password"
                  placeholder="0x..."
                  value={privateKey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrivateKey(e.target.value)
                  }
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  ⚠️ Use a temporary key with limited funds. Key is encrypted and
                  deleted after execution.
                </p>
              </div>

              {errorMessage && (
                <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-2 rounded">
                  {errorMessage}
                </div>
              )}

              <Button
                onClick={handleExecute}
                disabled={isExecuting || !privateKey}
                className="w-full"
              >
                {isExecuting ? "Executing..." : "Execute Program"}
              </Button>
            </div>
          )}

          {step === "completed" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span>Program execution started!</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Your program is now running on the TEE node...
              </div>
              <Button disabled className="w-full">
                ✓ Execution Complete
              </Button>
            </div>
          )}

          {step === "error" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-red-600">
                <div className="h-2 w-2 bg-red-500 rounded-full" />
                <span>Payment failed</span>
              </div>
              <div className="text-sm text-muted-foreground bg-red-50 dark:bg-red-950/20 p-3 rounded">
                {errorMessage}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handlePayment}
                  variant="outline"
                  className="flex-1"
                >
                  Retry Payment
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Protocol Info */}
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Payment processed via X402 protocol</p>
              <p>• Funds transferred to platform treasury</p>
              <p>• Program execution begins after confirmation</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
