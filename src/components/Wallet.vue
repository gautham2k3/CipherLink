<template>
    <div class="MainBody">
        <h2>Connect our Wallet</h2>
        <button @click="connectWallet()">Connect Wallet</button>
        <p v-if="walletAddress">{{walletAddress}}</p>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { CheckIfWalletConnected,connectWallet } from '../Utils/apiFeature';
    export default {
  setup() {
    const walletAddress = ref(null); 

    const connectWallet = async () => {
      try {
        const address = await connectWallet();
        walletAddress.value = address;
      } catch (error) {
        console.error(error); 
      }
    };

    return { walletAddress, connectWallet };
  },
};
</script>

<style>
/* Suggested code may be subject to a license. Learn more: ~LicenseLog:2668229955. */
.MainBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}
</style>