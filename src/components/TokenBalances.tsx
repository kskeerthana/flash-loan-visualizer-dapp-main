import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { connectContracts } from "@/utils/connectContracts";
import { FLASH_LOAN_SIMULATOR_ADDRESS, DEMO_FLASH_LOAN_USER_ADDRESS, SIMPLE_ERC20_TOKEN_ADDRESS } from "@/constants/contracts";
import { parseEther, formatEther } from "ethers"; // ✅ ethers v6

const TokenBalances = () => {
  const [walletBalance, setWalletBalance] = useState<string>('0.00');
  const [simulatorBalance, setSimulatorBalance] = useState<string>('0.00');
  const [userContractBalance, setUserContractBalance] = useState<string>('0.00');

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const { provider, testToken } = await connectContracts();
        const accounts = await provider.listAccounts();

        const walletBal = await testToken.balanceOf(accounts[0]);
        const simulatorBal = await testToken.balanceOf(FLASH_LOAN_SIMULATOR_ADDRESS);
        const userBal = await testToken.balanceOf(DEMO_FLASH_LOAN_USER_ADDRESS);

        setWalletBalance(parseFloat(formatEther(walletBal)).toFixed(2));
        setSimulatorBalance(parseFloat(formatEther(simulatorBal)).toFixed(2));
        setUserContractBalance(parseFloat(formatEther(userBal)).toFixed(2));
      } catch (error) {
        console.error("Failed to fetch balances", error);
      }
    };

    fetchBalances();

    // Optional: refresh every 30 seconds
    const interval = setInterval(fetchBalances, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{walletBalance} TEST</p>
        </CardContent>
      </Card>

      {/* Flash Loan Simulator Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Simulator Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{simulatorBalance} TEST</p>
        </CardContent>
      </Card>

      {/* Demo FlashLoan User Contract Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">User Contract Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{userContractBalance} TEST</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenBalances;
