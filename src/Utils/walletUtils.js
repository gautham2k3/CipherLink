import { ethers } from 'ethers';

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

const showWalletInstallModal = () => {
  const modal = document.createElement('div');
  modal.className = 'wallet-install-overlay';
  modal.innerHTML = `
    <div class="wallet-install-modal">
      <div class="modal-header">
        <h3>Wallet Required</h3>
        <button class="modal-close" onclick="this.closest('.wallet-install-overlay').remove()">×</button>
      </div>
      <div class="modal-body">
        <p>You need a crypto wallet to use this application. Please install one of these popular wallets:</p>
        <div class="wallet-options">
          <button class="wallet-option" onclick="window.open('https://metamask.io/download/', '_blank')">
            <div class="wallet-info" style="display:flex; flex-direction:column; align-items:flex-start;">
			  <div style="display:flex; align-items:center;">
				<img src="/src/assets/MetaMask-icon-fox.svg" alt="MetaMask" style="width:36px; height:36px; margin-right:10px;"/>
              	<img src="/src/assets/MetaMask-logo-white.svg" alt="" style="height:36px;"/>
			  </div>
            </div>
          </button>
          <button class="wallet-option" onclick="window.open('https://trustwallet.com/download', '_blank')">
            <div class="wallet-info">
              <img src="/src/assets/Trust Wallet Core Logo_Green.svg" alt="Trust Wallet" style="width:200px; height:auto; margin-bottom:5px;"/>
            </div>
          </button>
          <button class="wallet-option" onclick="window.open('https://walletconnect.network/', '_blank')">
            <div class="wallet-info">
				<div style="display:flex; align-items:center;">
					<img src="/src/assets/walletconnect_white.svg" alt="WalletConnect" style="width:200px; height:auto; margin-right:10px;"/>
				</div>
            </div>
          </button>
        </div>
        <p class="modal-note">After installation connect to Sepolia Ethereum Testnet, refresh this page to connect your wallet.</p>
      </div>
    </div>
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    .wallet-install-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(4px);
    }
    .wallet-install-modal {
      background: #1e293b;
      border-radius: 16px;
      padding: 0;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .modal-header h3 {
      color: white;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .modal-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    .modal-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
    .modal-body {
      padding: 20px;
    }
    .modal-body p {
      color: #e2e8f0;
      margin: 0 0 20px 0;
      line-height: 1.6;
    }
    .wallet-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }
    .wallet-option {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .wallet-option:hover {
      background: rgba(59, 130, 246, 0.1);
      border-color: #3b82f6;
      transform: translateY(-2px);
    }
    .wallet-info {
      display: flex;
      flex-direction: column;
    }
    .wallet-info strong {
      font-size: 16px;
      margin-bottom: 4px;
    }
    .wallet-info span {
      font-size: 14px;
      color: #94a3b8;
    }
    .modal-note {
      font-size: 14px;
      color: #94a3b8;
      text-align: center;
      margin: 0;
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(modal);
};


export const connectWallet = async (walletAddress) => {
 try {
    if (typeof window.ethereum === 'undefined') {
      showWalletInstallModal();
      return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length > 0) {
      walletAddress.value = accounts[0];
    }
    
  } catch (error) {
    console.error('Wallet connection error:', error);
    
    if (error.code === 4001) {
      alert('Please connect to your wallet to continue');
    } else if (error.code === -32602) {
      alert('Invalid parameters. Please try again');
    } else {
      alert('Failed to connect wallet. Please try again');
    }
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

export const checkUserExists = async (walletAddress) => {
	  try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		const userExists = await contract.checkUserExists(walletAddress);
		return userExists;
	  } catch (error) {
		console.error('Error checking user existence:', error);
		return false;
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