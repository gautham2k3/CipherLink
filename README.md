<div align="center">
<<<<<<< HEAD
  <img src="/home/user/chatapp/src/assets/ChatLogo.svg" alt="Decentralized Chat App Logo" width="100">  
=======
  <img src="https://i.ibb.co/r4hyX78/Chat-Logo-bc.png" alt="Decentralized Chat App Logo" width="100">  
>>>>>>> df74824 (Updated Readme)
</div>

<h1 align="center">Blockchain Based Messaging Application</h1>

<p align="center">
  A secure and transparent chat application built on the blockchain using Vue.js, Vite, and Solidity.
</p>

<br>

## Features

* **Decentralized Architecture:** Built on blockchain technology, ensuring data security, transparency, and censorship resistance.
* **User Registration & Login:** Secure user accounts with blockchain-based authentication.
* **Contact Management:** Easily add and manage contacts within the application.
* **Real-time Messaging:** Instant message delivery with end-to-end encryption for privacy.
* **Cryptocurrency Integration:** Seamless integration with cryptocurrency wallets for transactions and incentives.
* **End-to-End Encryption:** Messages are encrypted, ensuring only the intended recipients can read them.
* **Open Source:**  The project's codebase is publicly available, promoting transparency and community contributions.

## Technologies Used

* **Vue.js:** A progressive JavaScript framework for building user interfaces.
* **Vite:** A build tool that significantly improves the front-end development experience.
* **Solidity:** A programming language for writing smart contracts on the Ethereum blockchain.
* **Web3.js:** A library for interacting with the Ethereum blockchain.
* **IPFS:** A decentralized file storage system for storing and sharing media.

## Getting Started

1. **Clone the repository:**

2. **Install dependencies:**
3. **Start the development server:**
4. **Deploy the smart contracts:**
   - Ensure you have a MetaMask wallet set up and connected to a suitable Ethereum network.
   - Use a tool like Remix or Hardhat to deploy the `ChatApp.sol` contract.
   - Update the contract address in your frontend code (`src/App.vue` or similar).


## Features

* **User Account Creation:** Users can create accounts by providing a username.
* **Messaging:** Users can send messages to other registered users.
* **Chat History:** Users can view their chat history with other users.
* **Decentralized Storage:** Messages and user data are stored securely on the blockchain and IPFS.


## Smart Contract Functionality

The core functionality of the application is handled by the `ChatApp` smart contract, which includes the following functions:

* **`createAccount(string name)`:** Creates a new user account with the provided name.
* **`getUserName()`:** Returns the username of the current user.

* **`getAllAppUsers()`:** Retrieves a list of all registered users.
* **`sendMessage(address friend_key, string _msg)`:** Sends a message to the specified friend.
* **`readMessage(address friend_key)`:** Retrieves the chat history with the specified friend.

## Contributing

Contributions are welcome! Please feel free to open issues and pull requests.


## Disclaimer

This project is for educational purposes only and should not be used in production environments without thorough security audits.

   