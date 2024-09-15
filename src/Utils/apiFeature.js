import { ethers } from "hardhat";
import web3Modal from "web3modal";


export const CheckIfWalletConnected = async () => {
    try {
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch(error) {
        console.log(error);
    }
}

export const connectWallet = async() => {
    try {
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch(error) {
        console.log(error);
    }
}

const fetchContract = (signerOrProvider) => {
    return new ethers.Contract(ChatAppAddress, ChatAppABI,signerOrProvider);
};

export const connectWithContract = async() => {
    try {
        const web3ModalObj = new web3Modal();
        const connection = await web3ModalObj.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch(error) {
        console.log(error);
    }
}

export const convertTime = (time) => {
    const newtime=new Date(time);
    const realtime= newtime.getHours()+"/"+newtime.getMinutes()+"  Date :"+newtime.getDate()+"/"+newtime.getMonth()+"/"+newtime.getFullYear();
    return realtime;
}