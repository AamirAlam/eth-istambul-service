import Web3 from "web3";
import { ERC20_ABI } from "../abis/erc20";

export async function approveERC20Token(
  web3,
  contractAddress,
  privateKey,
  spenderAddress,
  amount
) {
  try {
    const tokenContract = new web3.eth.Contract(ERC20_ABI, contractAddress);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.defaultAccount = account.address;

    // @ts-ignore
    const approvalData = tokenContract.methods
      .approve(spenderAddress, amount)
      .encodeABI();

    const signedTransaction = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data: approvalData,
        gas: "50000", // Adjust the gas limit as needed
      },
      privateKey
    );

    if (!signedTransaction.rawTransaction)
      throw new Error("Failed to sign transaction");

    // Send the signed transaction
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log("Approve Transaction successful:", transactionReceipt);
    return true;
  } catch (error) {
    console.error("Approve Failed to approve ERC20 token:", error);
    return false;
  }
}
