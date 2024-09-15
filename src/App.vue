<script>
import { ref } from 'vue'
import { Signer, ethers } from 'ethers';
import { connectWallet, registerWallet} from './Utils/walletUtils';
export default {
  setup() {
    const walletAddress = ref(null); 
    const userName = ref('');
    const isRotating = ref(false);
    const isBlinking = ref(false);
    const userNumber=ref(0);

    return { 
      walletAddress, 
      userName, 
      isRotating, 
      isBlinking,
      userNumber,
      connectWallet: () => connectWallet(walletAddress),
      registerWallet: () => registerWallet(userNumber, isRotating, isBlinking)
    };
  }
};
</script>


<template>
  <body>
  <div class="app-container">
  <div class="left-container">
    <div class="solar-system">
    <a href="https://sepolia.etherscan.io/address/0xDD7905cEf2a32AD66d8db4d64C92EEeae19EfA38" title="Smart Contract" class="center-image" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn-icons-png.flaticon.com/512/551/551227.png" alt="Center" />
    </a>
    <!-- Orbiting circles -->
    <div class="orbit orbit-1">
      <div class="circle"></div>
    </div>
    <div class="orbit orbit-2">
      <div class="circle"></div>
    </div>
    <div class="orbit orbit-3">
      <div class="circle"></div>
    </div>
  </div>
  </div>
  <div class="right-container">
    <h1>Blockchain Chat App</h1>
    <button class="connectButton" @click="connectWallet">Connect Wallet</button>
    <p class="addressUI" v-if="walletAddress">{{walletAddress}}</p>
    <form v-if="walletAddress" @submit.prevent="registerWallet"> 
      <label for="name">Enter Number (Test Contract)</label><br>
      <input type="number" v-model="userNumber"><br>
      <button v-if="userNumber" class="registerButton" type="submit">Register</button>
   </form>
  </div>
  </div>
</body>
</template>

<style scoped>

.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.left-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.right-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: monospace, serif;
  letter-spacing: 0.05em;
}
h1 {
  font-size: 23px;
}
.solar-system {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

.center-image {
  position: absolute;
  top: 50%;
  left: 49.5%;
  transform: translate(-50%, -50%);
  z-index: 10;
  transition: filter 300ms;
}

.center-image:hover {
  filter : drop-shadow(0 0 2em hsla(120, 41%, 53%, 0.667));
}

.center-image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5); /* Makes the orbit path visible */
  transform-origin: center;
  transform: translate(-50%, -50%); /* Ensure orbits are centered */
  animation: revolve 10s infinite linear;
}

.orbit-1 {
  width: 150px;
  height: 150px;
  top: 30%;
  left: 30%;
  animation-duration: 8s;
}

.orbit-2 {
  width: 200px;
  height: 200px;
  top: 23.5%;
  left:23.5%;
  animation-duration: 12s;
}

.orbit-3 {
  width: 250px;
  height: 250px;
  top:17%;
  left:17%;
  animation-duration: 16s;
}

.circle {
  width: 30px;
  height: 30px;
  background-color: #007bff;
  border-radius: 50%;
  position: absolute;
  top: -7%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}

@keyframes revolve {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


.addressUI {
  font-size: 1.2em;
  margin-top: 10px;
}
button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: filter 300ms;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

input {
  padding: 8px 20px;
  margin-bottom: 10px;
  border: 1px solid #4bb82a;
  border-radius: 4px;
  font-size: 16px;
  transition: filter 300ms;
}
 input:hover {
  border: 1px solid #81aa74;
  filter : drop-shadow(0 0 2em #646cffaa);
}

.connectButton:hover {
  background-color:#438445;
  filter: drop-shadow(0 0 2em #646cffaa);
}
.registerButton:hover {
  background-color:#438474;
  filter: drop-shadow(0 0 2em #646cffaa);
}
.rotate {
  animation: rotateAnimation 3s linear infinite;
}

@keyframes rotateAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animation for blinking */
.blink {
  animation:fadeAnimation 1.5s infinite;
}

@keyframes fadeAnimation {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
