<template>
<body>
  <div class="app-container">
  <div class="left-container">
    <div class="solar-system">
    <a href="https://sepolia.etherscan.io/address/0x49C914083314a62B91BB4F7c03d1b6B658F56C27" title="Smart Contract" class="center-image" target="_blank" rel="noopener noreferrer">
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
  <div v-if="!isBlinking" class="right-container">
    <button class="Home_button_N" @click="goToHome"><i class="fa-solid fa-circle-arrow-right"></i></button>
    <h1>Blockchain Chat App</h1>
    <button class="connectButton" @click="connectWallet">Connect Wallet</button>
    <p class="addressUI" v-if="walletAddress">{{walletAddress}}</p>
    <form v-if="walletAddress" @submit.prevent="registerWallet"> 
      <label for="name">Enter your name:</label><br>
      <input type="text" v-model="userName"><br>
      <button v-if="userName" class="registerButton" type="submit">Register</button>
   </form>
  </div>
  <div v-else class="right-gard-container">
    <span style="font-size: 78px; color: #fff;" @click="goToHome" class="fade-in">
      <i class="fa-regular fa-circle-check"></i>
    </span>
    <div class="infoContainer">
      <span>Welcome, {{userName}}!</span><br>
      <button class="Home_button" @click="goToHome"><i class="fa-solid fa-circle-arrow-right"></i> NEXT</button>
    </div>
    <!-- <div class="grid-item">
      <div class="item-style">
        <div class="thumb">
          <a href="#">
            <img src="https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg" alt="">
          </a>
          <button class="conformation">
            <i class="fa-regular fa-circle-check"></i>
          </button>
        </div>
      </div>
    </div> -->
  </div>
  </div>
</body>
</template>

<script>
import { ref } from 'vue'
import { connectWallet, registerWallet } from '../Utils/walletUtils';

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
      registerWallet: () => registerWallet(userName, isRotating, isBlinking)
      

    };
  },
  methods: {
    goToHome() {
      this.$router.push('/Home')
    },
  },
};
</script>


<style>
body, html {
  overflow: hidden;
  height: 100%; 
}


.Home_button {
  margin-top: 10px;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: linear-gradient(to right, #75787d, #325378);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.137);
}

.Home_button_N {
  background-color: transparent;
}


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
  text-align: center;
  letter-spacing: 0.05em;
}
.fade-in { animation: fadeIn 5s; }
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.right-gard-container{
  width: 400px;
  margin: 0 auto;
  /* display: flex;
  flex-wrap: wrap; */
  height:auto;
  border-radius: 20px;
  background: rgb(153,149,217);
  background: radial-gradient(circle, rgba(153,149,217,1) 0%, rgba(9,9,121,1) 51%, rgba(2,10,11,1) 100%);
}
.grid-item {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 30px;
}
.item-style {
    background: #20202d;
    border-radius: 10px;
    transition: 0.3s;
}
.item-style:hover {
    box-shadow: rgb(255 255 255 / 25%) 0px 0px 5px 5px;
}
.item-style .thumb {
    position: relative;
    overflow: hidden;
    display: block;
    border-radius: 10px 10px 0 0;
}
.item-style .thumb img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: 0.5s;
}


.infoContainer {
  display: flex;
  flex-direction: column; 
  align-items: center; 
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
  border: 2px solid rgba(255, 255, 255, 0.5);
  transform-origin: center;
  transform: translate(-50%, -50%); 
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

.connectButton {
  margin-top: 10px;
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

@media only screen and (max-width: 768px) {
  .app-container  {
    display:flex;
    flex-direction: column;
  }
}
</style>