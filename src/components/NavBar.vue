<script>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { connectWallet, getUserName } from '../Utils/walletUtils';


export default {
    setup() {
        const connected = ref(false);
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
        return {
        connected,
        userName,
        walletAddress,
        avatarUrl,
        smallwalletAddress,
        connectWallet: handleConnectWallet
        };
    }
};
</script>

<template>
    <nav class="navbar">
        <div class="logo">
            <img src="/src/assets/ChatLogo.svg" alt="Chat Logo"/>
            <a href="#">Chat DApp</a>
        </div>
        <div class="nav-links">
            <RouterLink to="/">Register</RouterLink>
            <RouterLink to="/Home">Home</RouterLink>
        </div>
        <div class="wallet-info">
            <div v-if="connected" class="user-info">
                <span class="user-name">{{ userName }}</span>
                <span class="wallet-address">{{ walletAddress }}</span>
                <span class="small-wallet-address">{{ smallwalletAddress }}</span>
            </div>
            <button v-if="!connected" @click="connectWallet()">
                Connect Wallet
            </button>
            <div v-if="connected" class="avatar-container">
                <img :src="avatarUrl" alt="Avatar" class="avatar" />
            </div>
        </div>
    </nav>
    
</template>

<style>
.navbar {
  background-color: #574545;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  position: fixed; 
  top: 0; 
  left: 0; 
  font-family: monospace, serif;
  letter-spacing: 0.05em;
}
.logo {
  display: flex;
  align-items: center;
}
.logo a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  font-family: monospace, serif;
  letter-spacing: 0.05em;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 20%;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-links a:hover{
  color: #00bcd4;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #00bcd4;
}
.wallet-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #e0dfda;
}

.small-wallet-address {
  display: none;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
}

.wallet-address {
  font-size: 14px;
}

.wallet-info button {
  background-color: #242424;
  border: 2px solid #c8c5c1;
  border-radius: 30px;
  box-shadow: #c8c5c1 4px 4px 0 0;
  color: #ebe6e0;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.wallet-info button:hover {
  background-color: #368f51;
}

.wallet-info button:active {
  box-shadow: #422800 2px 2px 0 0;
  transform:translate(2px,2px);
}

@media (min-width: 768px) {
  .wallet-info button {
    min-width: 120px;
    padding: 0 25px;
  }
}

.avatar-container {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #00bcd4;
}

@media only screen and (max-width: 768px) {
  .logo a {
    display: none;
  }
  .wallet-info button {
    font-size: 14px;
  }
  .nav-links {
    display: none;
  }
  .wallet-address {
    display: none;
  }
  .small-wallet-address {
    display:block;
  }
}
</style>