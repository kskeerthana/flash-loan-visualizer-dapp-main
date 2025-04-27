
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TokenBalances = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0.00 TEST</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Simulator Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0.00 TEST</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">User Contract Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">0.00 TEST</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenBalances;
