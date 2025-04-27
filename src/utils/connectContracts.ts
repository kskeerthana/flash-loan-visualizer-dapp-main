import { BrowserProvider, Contract, parseEther } from "ethers";
import { FlashLoanSimulatorABIData, DemoFlashLoanUserABIData, SimpleERC20TokenABIData, FLASH_LOAN_SIMULATOR_ADDRESS, DEMO_FLASH_LOAN_USER_ADDRESS, SIMPLE_ERC20_TOKEN_ADDRESS } from "../constants/contracts";

export const connectContracts = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const flashLoanSimulator = new Contract(
    FLASH_LOAN_SIMULATOR_ADDRESS,
    FlashLoanSimulatorABIData,
    signer
  );

  const demoFlashLoanUser = new Contract(
    DEMO_FLASH_LOAN_USER_ADDRESS,
    DemoFlashLoanUserABIData,
    signer
  );

  const testToken = new Contract(
    SIMPLE_ERC20_TOKEN_ADDRESS,
    SimpleERC20TokenABIData,
    signer
  );

  return { provider, signer, flashLoanSimulator, demoFlashLoanUser, testToken };
};
