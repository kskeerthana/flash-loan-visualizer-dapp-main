
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FlashLoanControls = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Token Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="approve-amount">Amount to Approve</Label>
              <Input id="approve-amount" placeholder="Enter amount" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Approve Tokens
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flash Loan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <Input id="loan-amount" placeholder="Enter amount" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Start Flash Loan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashLoanControls;
