<div align="center">
  <img src="https://cipherlink-ten.vercel.app/assets/CipherLink-logo.svg" alt="CipherLink Logo" width="100">  
</div>

<h1 align="center">CipherLink - Blockchain Based Messaging Application</h1>

<p align="center">
  A secure and decentralized messaging platform built on blockchain technology using Vue 3, Vite, and Ethereum Smart Contracts.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.0-green.svg" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Solidity-0.8.0-blue.svg" alt="Solidity" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  <a href="https://cipherlink-ten.vercel.app"><img src="https://img.shields.io/badge/Demo-Live-success.svg" alt="Demo" /></a>
</p>

<p align="center">
  <a href="https://cipherlink-ten.vercel.app">View Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#Contributing">Contributing</a>
</p>

## Features

* **Wallet Integration:** Connect with MetaMask and other Web3 wallets
* **Decentralized Messaging:** Direct peer-to-peer messaging via smart contracts
* **User Profiles:** Create and manage your blockchain identity
* **Favorites System:** Add frequent contacts to favorites for quick access
* **Real-time Updates:** Instant message delivery and status updates
* **Responsive Design:** Seamless experience across all devices


## Technologies Used

* **Vue.js:** A progressive JavaScript framework for building user interfaces.
* **Vite:** A build tool that significantly improves the front-end development experience.
* **Solidity:** A programming language for writing smart contracts on the Ethereum blockchain.
* **Web3.js:** A library for interacting with the Ethereum blockchain.


## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/gautham2k3/CipherLink.git
cd CipherLink
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 📝 Smart Contract Functions

The application uses the following smart contract functions:

* `createAccount(string name)`: Register new user
* `getUserName()`: Get current user's name
* `getAllAppUsers()`: List all registered users
* `sendMessage(address friend_key, string _msg)`: Send message
* `readMessage(address friend_key)`: Retrieve chat history
* `checkUserExists(address pubkey)`: Verify user registration

## 🔧 Configuration

The application requires:
- MetaMask or compatible Web3 wallet
- Connection to Ethereum network
- Smart contract deployed and configured

## 🌐 Deployment

The application is configured for deployment on Vercel with the following specifications:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: Vite

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## ⚠️ Disclaimer

This project is for demonstration and educational purposes. Use in production environments requires additional security measures and auditing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
   
