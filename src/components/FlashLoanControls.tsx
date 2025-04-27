import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { parseEther } from "ethers";
import { connectContracts } from "@/utils/connectContracts";
import { SIMPLE_ERC20_TOKEN_ADDRESS } from "@/constants/contracts";

const FlashLoanControls = () => {
  const [approveAmount, setApproveAmount] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [loadingDeposit, setLoadingDeposit] = useState<boolean>(false);
  const [loadingFullCycle, setLoadingFullCycle] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeposit = async () => {
    try {
      setLoadingDeposit(true);
      const { flashLoanSimulator } = await connectContracts();
      const tx = await flashLoanSimulator.deposit(
        SIMPLE_ERC20_TOKEN_ADDRESS,
        parseEther(depositAmount)
      );
      await tx.wait();
      toast({ title: "Tokens Deposited ✅", description: `Deposited ${depositAmount} tokens.` });
    } catch (error) {
      console.error("Deposit failed", error);
      toast({ title: "Deposit Failed ❌", variant: "destructive" });
    } finally {
      setLoadingDeposit(false);
    }
  };

  const handleFullFlashLoanCycle = async () => {
    try {
      setLoadingFullCycle(true);

      const { testToken, demoFlashLoanUser } = await connectContracts();

      // 1. Approve tokens
      const approveTx = await testToken.approve(
        SIMPLE_ERC20_TOKEN_ADDRESS,
        parseEther(approveAmount)
      );
      await approveTx.wait();
      toast({ title: "Step 1 ✅", description: "Tokens approved." });

      // 2. Start Flash Loan
      const loanTx = await demoFlashLoanUser.startFlashLoan(
        SIMPLE_ERC20_TOKEN_ADDRESS,
        parseEther(loanAmount)
      );
      await loanTx.wait();
      toast({ title: "Step 2 ✅", description: "Flash Loan Successful!" });

    } catch (error) {
      console.error("Full flash loan cycle failed", error);
      toast({ title: "Full Cycle Failed ❌", variant: "destructive" });
    } finally {
      setLoadingFullCycle(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Deposit Card */}
      <Card>
        <CardHeader>
          <CardTitle>Deposit Tokens (Separate)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Amount to Deposit</Label>
            <Input
              placeholder="Enter deposit amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <Button
              onClick={handleDeposit}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loadingDeposit}
            >
              {loadingDeposit ? "Depositing..." : "Deposit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Full Flash Loan Cycle Card */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Full Flash Loan Cycle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">

            <div className="space-y-2">
              <Label>Amount to Approve</Label>
              <Input
                placeholder="Enter amount to approve"
                value={approveAmount}
                onChange={(e) => setApproveAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Loan Amount</Label>
              <Input
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            <Button
              onClick={handleFullFlashLoanCycle}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loadingFullCycle}
            >
              {loadingFullCycle ? "Processing Full Cycle..." : "Start Full Flash Loan Cycle 🚀"}
            </Button>

          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default FlashLoanControls;
