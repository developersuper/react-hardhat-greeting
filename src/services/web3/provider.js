import { ethers } from 'ethers';

export const requestAccount = async () => {
  await window.ethereum.request({ method: 'eth_requestAccounts'});
}

export const getProvider = async () => {
  if(typeof window.ethereum !== 'undefined'){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      await requestAccount();
      // await provider.send('eth_requestAccounts', []);
      return provider;
    }catch(error) {
      throw Error('getting provider has errors');
    }
  }else {
    throw Error('no metamask');
  }
}


export const getUserAddress = async () => {
  try {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    return userAddress
  }catch(error) {
    console.log(error);
    return null;
  }
}

export const getWalletBalance = async (wallet) => {
  try {
    const provider = await getProvider();
    let balance = await provider.getBalance(wallet);
    console.log(balance);
    return ethers.utils.formatEther(balance); 
  }catch(error) {
    console.log(error);
    return null;
  }
}