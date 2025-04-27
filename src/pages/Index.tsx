
import WalletConnect from "@/components/WalletConnect";
import TokenBalances from "@/components/TokenBalances";
import FlashLoanControls from "@/components/FlashLoanControls";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <WalletConnect />
      <main className="container mx-auto px-4 py-8">
        <TokenBalances />
        <FlashLoanControls />
      </main>
    </div>
  );
};

export default Index;
