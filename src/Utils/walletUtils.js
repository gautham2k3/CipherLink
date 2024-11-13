// Suggested code may be subject to a license. Learn more: ~LicenseLog:2900066568.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:965671230.
import { ethers } from 'ethers';
import { RouterLink } from 'vue-router';

// const contractAddress = "0x5784A9cA665927081c7696E30cdfCa170cF5EEE9";
// const contractABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "pubkey",
// 				"type": "address"
// 			}
// 		],
// 		"name": "checkUserExists",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "name",
// 				"type": "string"
// 			}
// 		],
// 		"name": "createAccount",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getAllAppUsers",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "address",
// 						"name": "accountAddress",
// 						"type": "address"
// 					}
// 				],
// 				"internalType": "struct ChatApp.AllUsersStruck[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getUserName",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "friendAddress",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "message",
// 				"type": "string"
// 			}
// 		],
// 		"name": "sendMessage",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "friendAddress",
// 				"type": "address"
// 			}
// 		],
// 		"name": "readMessage",
// 		"outputs": [
// 			{
// 				"internalType": "string[]",
// 				"name": "",
// 				"type": "string[]"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ];
const contractAddress = "0x49C914083314a62B91BB4F7c03d1b6B658F56C27";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pubkey",
				"type": "address"
			}
		],
		"name": "checkUserExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "createAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAppUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "accountAddress",
						"type": "address"
					}
				],
				"internalType": "struct ChatApp.AllUsersStruct[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "getAllUsers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "friend_key",
				"type": "address"
			}
		],
		"name": "readMessage",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					}
				],
				"internalType": "struct ChatApp.Message[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "friend_key",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_msg",
				"type": "string"
			}
		],
		"name": "sendMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
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

export const registerWallet = async (userName, isRotating, isBlinking) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.createAccount(userName.value);
	console.log(userName);

    isRotating.value = false;
    isBlinking.value = false;

    tx.wait().then((receipt) => {
      if (receipt.status === 1) {
		console.log('Account created successfully', receipt);
		isBlinking.value = true;
		// this.$router.push(`/Home`);
	  } else {
		console.error('Transaction failed', receipt);
    	}
  }).catch(error => {
    console.error('Error creating account:', error);
  });
  } catch (error) {
    console.error('Error creating account:', error);
  }
};

export const getUserName = async () => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccounts", []); 
		const signer = provider.getSigner(); 
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		const userName = await contract.getUserName();
		console.log('User Name:', userName);
		return userName; 
	} catch(error) {
		console.error('Account not created',error);
	}
}

export const getAllAppUsers = async () => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		const allUsers = await contract.getAllAppUsers();
		console.log('All Users:', allUsers);
		return allUsers;
	} catch (error) {
		console.error('Error fetching all users:', error);
	}
}

export const sendMessage = async (friendAddress, message) => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		const tx = await contract.sendMessage(friendAddress, message);
		await tx.wait();
		console.log('Message sent successfully!');
	} catch (error) {
		console.error('Error sending message:', error);
	}
}

export const readMessage = async (friendAddress) => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		const messages = await contract.readMessage(friendAddress);
		console.log('Messages:', messages);
		return messages;
	} catch (error) {
		console.error('Error reading messages:', error);
	}
}