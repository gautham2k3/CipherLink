<template>
<body>
  <div class="reg-app-container">
  <div class="reg-left-container">
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
  <div v-if="!isBlinking" class="reg-right-container">
    <button class="Reg_button_N" @click="goToHome"><i class="fa-solid fa-circle-arrow-right"></i></button>
    <a class="appName" href="#">CipherLink</a>
    <button class="connectButton" @click="connectWallet">Connect Wallet</button>
    <p class="addressUI" v-if="walletAddress">{{ walletAddress }}</p>
    <form v-if="walletAddress" @submit.prevent="registerWallet"> 
      <label for="name">Enter your name:</label><br>
      <input type="text" v-model="userName"><br>
      <button v-if="checkUserExists(walletAddress) && userName" class="registerButton" type="submit">Register</button>
   </form>
  </div>
  <div v-else class="right-gard-container">
    <div class="reg-grid-item">
      <div class="reg-item-style">
        <div class="reg-thumb">
          <span style="font-size: 78px; color: #fff;" @click="goToHome" class="fade-in">
      <i class="fa-regular fa-circle-check"></i>
    </span>
        </div>
        <div class="reg-nftContent">          
      <span>Welcome, {{userName}}!</span><br>
      <button class="Reg_button" @click="goToHome"><i class="fa-solid fa-circle-arrow-right"></i> NEXT</button>
       <h3 class="reg-nftTitle">
            {{ userName }}
          </h3>
          <h5 class="nftUserAddress">
            {{ walletAddress }}
          </h5>
          <div class="nftLastFlex d-flex-between">
            <a href="#" class="btn">
              <span>
                <i class="fa-solid fa-clock-rotate-left"></i>just now
              </span>
            </a>
            <a href="#" @click="goToHome" class="btn btn-cart btn-outline">
              <span>
                <i class="fa-solid fa-circle-arrow-right"></i> NEXT
              </span>
            </a>
          </div> 
        </div>
      </div>
    </div> 
  </div>
  </div>
</body>
</template>

<script>
import { ref } from 'vue'
import { checkUserExists, connectWallet, registerWallet } from '../Utils/walletUtils';

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
    async checkUserExists() {
      if (this.walletAddress) {
        const exists = await checkUserExists(this.walletAddress);
        if (exists) {
          this.isBlinking = true;
          this.$router.push('/Home');
        }
      }
    }
  },
};
</script>


<style>
body, html {
  overflow: hidden;
  height: 100%; 
}


@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.Reg_button {
  margin-top: 10px;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background: linear-gradient(to right, #75787d, #325378);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.137); 
}

.Reg_button_N {
  background-color: transparent;
}


.reg-app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.reg-left-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.reg-right-container {
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

.reg-right-container a {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
  margin-left: 0.75rem;
  font-family: monospace, serif;
  background: linear-gradient(250deg,#0f33a5,#c2c8db,#78ed36);
  background-size: 180% 180%;
  animation: gradient-animation 18s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


.reg-right-gard-container{
  width: 320px;
  margin: 0 auto;
  display: block;
  /* display: flex;
  flex-wrap: wrap; 
  height:auto;
  border-radius: 20px;
  background: rgb(153,149,217);
  background: radial-gradient(circle, rgba(153,149,217,1) 0%, rgba(9,9,121,1) 51%, rgba(2,10,11,1) 100%);
  */
}
.reg-thumb {
  width: 100%;
  height: 200px;
  background: rgb(153,149,217);
  background: radial-gradient(circle, rgba(153,149,217,1) 0%, rgba(9,9,121,1) 51%, rgba(2,10,11,1) 100%);
}
.reg-grid-item {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 30px; 
}
/* 
@media (min-width: 768px) {
    .grid-item {
        width: 50%;
    }
}
@media (min-width: 992px) {
    .grid-item {
        width: 33.33%;
    }
} */

.reg-item-style {
    background: #20202d;
    border-radius: 10px;
    transition: 0.3s;
}
.reg-item-style:hover {
    box-shadow: rgb(255 255 255 / 25%) 0px 0px 5px 5px;
}
.reg-item-style .reg-thumb {
    position: relative;
    display: flex;
    justify-content: center; 
    align-items: center;
    border-radius: 10px 10px 0 0;
}


.reg-nftContent {
    padding: 15px 20px;
} 
.reg-nftTitle {
    font-size: 18px;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
}
.nftTitle a {
    color: #fff;
}
.nftUserAddress {
    font-size: 12px;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.reg-nftLastFlex {
  margin-top: 5px; 
  position: relative;
}
.reg-d-flex-between{
  display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn span {
    display: inline-flex;
    align-items: center;
    z-index: 1;
}
.btn i {
    padding-right: 8px;
    transition: 0.1s;
}
.btn-cart {
    position: relative;
    overflow:hidden ;
    font-size: 18px;
    padding: 6px 25px;
    display: inline-flex;
    align-items: center;
    color: #18b625;
    border-radius: 50px;
    border: 2px solid rgba(15, 196, 115, 0.7);
    height: 30px;
    min-height: 30px;
    transition: 0.7s;
}
.btn-cart:hover {
    color: #fff;
    transform: translateY(-2px);
}
.btn-outline::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(97.3deg, #dd2476 0%, #ff512f 100%);
    transition: transform 0.7s;
    transform-origin: right;
    transform: scaleX(0);
    z-index: 0;
    border-radius: inherit;
}
.btn-outline:hover::before {
    transform: scaleX(1);
    transform-origin: left;
    transition: transform 0.7s;
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
  .reg-app-container  {
    display:flex;
    flex-direction: column;
  }
}
</style>