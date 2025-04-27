import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const WalletConnect = () => {
  const [account, setAccount] = useState<string>('');
  const { toast } = useToast();

  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to use this dApp",
        variant: "destructive"
      });
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setAccount(accounts[0]);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <h1 className="text-xl font-semibold text-purple-700">Flash Loan Simulator</h1>
      <Button 
        onClick={connectWallet}
        className="bg-purple-600 hover:bg-purple-700"
      >
        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </Button>
    </div>
  );
};

export default WalletConnect;
