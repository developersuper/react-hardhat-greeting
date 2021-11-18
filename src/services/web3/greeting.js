import { ethers } from 'ethers';
import { getProvider } from 'services/web3/provider';
import Greeter from 'artifacts/contracts/Greeter.sol/Greeter.json';
import { greeterAddress } from 'config/config';

export const fetchGreeting = async () => {
  const provider = await getProvider();
  try {
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
    const data = await contract.greet();
    return data;
  }catch(error) {
    console.log(error);
    throw Error('fetching Greeting has errors');
  }
}

export const setNewGreeting = async (_newGreeting) => {
  const provider = await getProvider();
  try{
    const signer = provider.getSigner();
    const contract  = new ethers.Contract(greeterAddress, Greeter.abi, signer);
    const tx = await contract.setGreeting(_newGreeting);
    await tx.wait();
    return _newGreeting;
  }catch(error) {
    console.log(error);
    throw Error('setting new Greeting has errors');
  }
}