<script>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { connectWallet, getUserName } from '../Utils/walletUtils';


export default {
    setup() {
        let connected = ref(false);
        const walletAddress = ref(null);
        const smallwalletAddress = ref(null);
        const userName = ref("User Not Registered");
        const avatarUrl = ref("https://ui-avatars.com/api/?name=NIL&size=40");
        const handleConnectWallet = async () => {
            await connectWallet(walletAddress); 
            if (walletAddress.value) {
                const tempUserName = await getUserName();
                if(tempUserName!=null) {
                  userName.value = await getUserName();
                }
                else {
                  userName.value = "User Not Registered";
                }
                connected.value = true;
                avatarUrl.value = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&rounded=true&bold=true`;

                const fhalf = walletAddress.value.slice(0, 4);
                const lhalf = walletAddress.value.slice(-3);
                smallwalletAddress.value = fhalf + "..." + lhalf;
                console.log(smallwalletAddress.value);
            }
        };
        const acDropdown = () => {
          const dropdown= document.getElementById("myDropdown");
          if(dropdown) {
            dropdown.classList.toggle("show");
          }
        };
        const copyAddress = () => {
          navigator.clipboard.writeText(walletAddress.value);
        }
        const disconnectWallet = () => {
          connected = false;
        }
        const toggleMobileMenu = () => {
          mobileMenuOpen.value = !mobileMenuOpen.value;
        }
        return {
        connected,
        userName,
        walletAddress,
        avatarUrl,
        smallwalletAddress,
        acDropdown,
        copyAddress,
        disconnectWallet,
        connectWallet: handleConnectWallet
        };
    }
};
</script>

<template>
  <nav class="navbar">
      <div class="navbar-container">
          <div class="logo">
              <img src="/src/assets/ChatLogo.svg" alt="Chat Logo"/>
              <a href="#">CipherLink</a>
          </div>
          
          <div class="hamburger" @click="toggleMobileMenu">
              <span></span>
              <span></span>
              <span></span>
          </div>
          
          <div class="nav-content" :class="{ 'active': mobileMenuOpen }">
              <div class="nav-links">
                  <RouterLink to="/" @click="mobileMenuOpen = false">Register</RouterLink>
                  <RouterLink to="/Home" @click="mobileMenuOpen = false">Home</RouterLink>
              </div>
              
              <div class="wallet-info">
                  <div v-if="connected" class="user-info">
                      <span class="user-name">{{ userName }}</span>
                      <span class="wallet-address">{{ walletAddress }}</span>
                      <span class="small-wallet-address">{{ smallwalletAddress }}</span>
                  </div>
                  <button v-if="!connected" @click="connectWallet()" class="connect-btn">
                      <span class="btn-text">Connect Wallet</span>
                      <span class="btn-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <rect x="2" y="5" width="20" height="14" rx="2" />
                              <line x1="16" y1="12" x2="16" y2="12" />
                          </svg>
                      </span>
                  </button>
                  <div v-if="connected" class="avatar-container">
                      <img :src="avatarUrl" alt="Avatar" class="avatar" @click="acDropdown()" />
                  </div>
                  <div class="dropdown">
                      <div class="dropdown-content" id="myDropdown">
                          <a href="#" @click="copyAddress()">
                              <i class="fa-solid fa-copy"></i>
                              <span>Copy Address</span>
                          </a>
                          <a href="#" @click="disconnectWallet()">
                              <i class="fa-solid fa-link-slash"></i>
                              <span>Disconnect</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </nav>
</template>
<style>
.navbar {
  background-color: rgba(30, 30, 40, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  width: 100%;
  position: fixed; 
  top: 0; 
  left: 0; 
  font-family: monospace, serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 600;
  margin-left: 0.75rem;
  font-family: monospace, serif;
  background: linear-gradient(250deg,#0f33a5,#c2c8db,#78ed36);
  background-size: 180% 180%;
  animation: gradient-animation 18s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
.logo img {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: rotate(5deg);
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: #00bcd4;
  background-color: rgba(0, 188, 212, 0.1);
}

.nav-links a.router-link-active {
  color: #00bcd4;
  font-weight: 600;
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #00bcd4;
  border-radius: 3px;
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgba(255, 255, 255, 0.9);
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
}

.wallet-address {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.small-wallet-address {
  display: none;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.connect-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #00bcd4, #3f51b5);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
}

.connect-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 188, 212, 0.4);
}

.connect-btn:active {
  transform: translateY(1px);
}

.btn-icon {
  display: flex;
  align-items: center;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #00bcd4;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 188, 212, 0.5);
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  top: 50px;
  background-color: #2a2a35;
  border-radius: 12px;
  min-width: 180px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1;
  overflow: hidden;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-content a {
  color: white;
  padding: 0.8rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.dropdown-content a:hover {
  background-color: #3a3a45;
}

.dropdown-content a i {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  color: #00bcd4;
}

.show {
  display: block;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media only screen and (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
  }
  
  .hamburger {
    display: flex;
    z-index: 1001;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
  
  .nav-content {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background-color: #1e1e28;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transition: right 0.3s ease;
  }
  
  .nav-content.active {
    right: 0;
  }
  
  .nav-links {
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .nav-links a {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
  
  .wallet-info {
    flex-direction: column;
    width: 100%;
  }
  
  .user-info {
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .wallet-address {
    display: none;
  }
  
  .small-wallet-address {
    display: block;
  }
  
  .connect-btn {
    width: 100%;
    justify-content: center;
  }
  
  .dropdown-content {
    position: fixed;
    top: auto;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .wallet-address {
    display: none;
  }
  
  .small-wallet-address {
    display: block;
  }
}
</style>