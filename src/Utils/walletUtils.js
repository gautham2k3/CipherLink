import { ethers } from 'ethers';

const contractAddress = "0xDD7905cEf2a32AD66d8db4d64C92EEeae19EfA38";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LogNumber",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "setnumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getnumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const connectWallet = async (walletAddress) => {
  try {
    const address = await window.ethereum.request({ method: 'eth_requestAccounts' });
    walletAddress.value = address[0];
  } catch (error) {
    console.error(error);
  }
};

export const registerWallet = async (userNumber, isRotating, isBlinking) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.setnumber(userNumber.value);
	console.log(userNumber);

    isRotating.value = true;
    isBlinking.value = true;

    setTimeout(() => {
      isRotating.value = false;
      isBlinking.value = false;
    }, 3000);

    await tx.wait();
    console.log('Account created successfully', tx);
  } catch (error) {
    console.error('Error creating account:', error);
  }
};
