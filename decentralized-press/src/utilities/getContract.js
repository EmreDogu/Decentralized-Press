import ContractAbi from "../artifacts/contracts/News.sol/News.json";
import Address from "../artifacts/contracts/News.sol/address.json"
import { ethers } from "ethers";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    Address.address,
    ContractAbi.abi,
    signer
  );
  return contract;
}