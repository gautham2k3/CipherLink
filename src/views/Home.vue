<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <div class="app-container">
    <NavBar/>
    <div class="chat-dashboard">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h2>Conversations</h2>
          <button class="action-button" @click="showAllUsers()">
            <i v-if="!userShown" class="fa-solid fa-user-plus"></i>
            <i v-else class="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div class="search-container">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search conversations...">
          </div>
        </div>
        
        <div class="features-carousel">
          <FeatureCard 
            v-for="feature in features" 
            :key="feature.id"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            @learn-more="navigateToFeature(feature.id)"
          />
        </div>
      </div>

      <!-- Main Chat Area -->
      <div class="main-content">
        <!-- Chat Header -->
        <div v-if="!userShown && chatUserRef.currentName" class="chat-header">
          <div class="user-profile">
            <div class="user-avatar">
              <img v-if="chatUserRef.currentName!=''" :src="`https://ui-avatars.com/api/?name=${chatUserRef.currentName}&size=48&rounded=true&bold=true&background=3b82f680&color=fff`" alt="User avatar" />
              <div v-if="chatUserRef.currentName!=''" class="user-status">
                <span class="status-indicator"></span>
              </div>
            </div>
            <div class="user-info">
              <h3>{{chatUserRef.currentName}}</h3>
              <p class="user-address">{{ chatUserRef.currentAddress }}</p>
            </div>
          </div>
          <div class="chat-actions">
            <button class="icon-action" @click="toggleSidebar" title="More options">
              <i :class="sidebarVisible ? 'fa-solid fa-angles-left' : 'fa-solid fa-angles-right'"></i>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div v-if="!userShown" class="messages-container">
          <div v-if="messages.length === 0" class="empty-state">
            <img src="/src/assets/onboard_splash_chatDapp.svg" alt="Start chatting" />
            <h3>No messages yet</h3>
            <p>Start a conversation with {{chatUserRef.currentName || 'your contact'}}</p>
            <button v-if="chatUserRef.currentName!=''" class="start-chat-button">
              <i class="fa-solid fa-message"></i> Start chatting
            </button>
          </div>
          
          <div v-else class="message-timeline">
            <div class="date-divider">
              <span>Today</span>
            </div>
            <div v-for="(message, index) in messages" :key="index" 
                 :class="[isSentMessage(message) ? 'message-item sent' : 'message-item received']">
              <div class="message-content">
                <p>{{ message[2] }}</p>
                <span class="message-time">{{ new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</span>
              </div>
              <div v-if="isSentMessage(message)" class="message-status">
                <i class="fa-solid fa-check-double"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div v-if="!userShown && chatUserRef.currentName!=''" class="message-composer">
          <button class="composer-action" title="Attach file">
            <i class="fa-solid fa-paperclip"></i>
          </button>
          <div class="message-input-wrapper">
            <input type="text" placeholder="Type your message..." class="chatInput">
            <button class="emoji-button" title="Add emoji">
              <i class="fa-regular fa-face-smile"></i>
            </button>
          </div>
          <button class="send-button" @click="sendMessage">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
          <button class="refresh-button" @click="fetchMessages" title="Refresh messages">
            <i class="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>

        <!-- All Users View -->
        <div v-if="userShown" class="users-directory">
          <div class="directory-header">
            <h2>All Registered Users</h2>
            <div class="directory-actions">
              <button class="filter-button">
                <i class="fa-solid fa-filter"></i> Filter
              </button>
              <button class="refresh-users" @click="fetchUsers">
                <i class="fa-solid fa-arrows-rotate"></i> Refresh
              </button>
            </div>
          </div>
          
          <div class="users-grid">
            <div v-if="testData.length==0" class="empty-directory">
              <i class="fa-solid fa-users-slash"></i>
              <p>No users found. Connect your wallet and refresh to see registered users.</p>
            </div>
            <div v-else class="user-cards">
              <div v-for="(user,index) in testData" :key="index" class="user-card-wrapper">
                <infoCards @close-users="closeUsers" :username="user.name" :useraddress="user.accountAddress"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Sidebar (New) -->
      <div v-if="!userShown && sidebarVisible && chatUserRef.currentName!=''"  class="info-sidebar">
        <div class="info-header">
          <h3>Details</h3>
          <button class="close-sidebar" @click="openUserDetails">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </div>
        
        <div class="user-profile-details">
          <div class="profile-image">
            <img :src="`https://ui-avatars.com/api/?name=${chatUserRef.currentName}&size=80&rounded=true&bold=true&background=3b82f680&color=fff`" alt="User profile" />
          </div>
          <h3>{{chatUserRef.currentName}}</h3>
          <p class="wallet-id">{{chatUserRef.currentAddress}}</p>
          
          <div class="profile-actions">
            <button class="profile-action">
              <i class="fa-solid fa-star"></i>
              <span>Favorite</span>
            </button>
            <button class="profile-action">
              <i class="fa-solid fa-bell"></i>
              <span>Mute</span>
            </button>
            <button class="profile-action">
              <i class="fa-solid fa-ban"></i>
              <span>Block</span>
            </button>
          </div>
        </div>
        
        <div class="shared-media">
          <div class="section-header">
            <h4>Shared Media</h4>
            <button class="view-all">View all</button>
          </div>
          <div class="media-grid">
            <div class="empty-media">
              <i class="fa-regular fa-images"></i>
              <p>No shared media yet</p>
            </div>
          </div>
        </div>
        
        <div class="blockchain-info">
          <div class="section-header">
            <h4>Blockchain Details</h4>
          </div>
          <div class="info-item">
            <span class="info-label">Network</span>
            <span class="info-value">Ethereum Sepolia</span>
          </div>
          <div class="info-item">
            <span class="info-label">First message</span>
            <span class="info-value">March 3, 2025</span>
          </div>
          <div class="info-item">
            <span class="info-label">Messages count</span>
            <span class="info-value">{{messages.length}}</span>
          </div>
          <a href="#" class="view-on-etherscan">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> View on Etherscan
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import NavBar from '../components/NavBar.vue';
import infoCards from '../components/infoCards.vue';
import featureCard from '../components/featureCard.vue';
import { getAllAppUsers } from '../Utils/walletUtils';
import {chatUser , setUser} from '../Utils/userUtils';
import { sendMessage, readMessage } from '../Utils/walletUtils';
import FriendInfo from '../components/friendInfo.vue';
import FeatureCard from '../components/featureCard.vue';

export default {
  components: { NavBar, infoCards , FriendInfo , FeatureCard},
  data() {
    return {
      userShown: ref(false),
      testData : ref([]),
      chatUserRef: ref(chatUser),
      messages: ref([]),
      sidebarVisible: ref(true),
      features: [
        {
          id: 1,
          icon: 'src/assets/icons/blockchain.svg',
          title: 'Blockchain-Powered',
          description: 'Leverages blockchain technology to ensure secure and transparent messaging with immutable records of conversations.'
        },
        {
          id: 2,
          icon: 'src/assets/icons/decentralized.svg',
          title: 'Decentralized Architecture',
          description: 'No central server means high availability, censorship resistance, and enhanced privacy for your communications.'
        },
        {
          id: 3,
          icon: 'src/assets/icons/encryption.svg',
          title: 'End-to-End Encryption',
          description: 'All messages are encrypted using advanced cryptographic algorithms, ensuring only intended recipients can read them.'
        },
      ],
    };
  },
  methods: {
    showAllUsers() {
      this.userShown = !this.userShown;
    },
    closeUsers() {
        this.userShown = false;
    } ,
    isSentMessage(message) {
      console.log(message[0]+" "+this.chatUserRef.currentAddress);
      return message[0].trim().toLowerCase() != this.chatUserRef.currentAddress.trim().toLowerCase();
    },
    openUserDetails() {
      window.open(`https://sepolia.etherscan.io/address/${this.chatUserRef.currentAddress}`, '_blank');
    },
    async fetchUsers() {
      const Users = await getAllAppUsers();
      console.log("Mounted Baby");
      if(Users) {
        this.testData= Users;
      }
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    async sendMessage() {
      const messageInput = document.querySelector('.chatInput');
      const message = messageInput.value.trim();
      if (message !== '') {
        await sendMessage(this.chatUserRef.currentAddress, message);
        messageInput.value = ''; 
        this.messages = await readMessage(this.chatUserRef.currentAddress);
      }
    },
    async fetchMessages() {
      if (this.chatUserRef.currentAddress) {
        this.messages = await readMessage(this.chatUserRef.currentAddress);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style>
:root {
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #2563eb;
  --secondary: #10b981;
  --secondary-light: #34d399;
  --secondary-dark: #059669;
  --accent: #8b5cf6;
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --bg-light: #334155;
  --text-light: #f1f5f9;
  --text-muted: #94a3b8;
  --border: #475569;
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

body {
  background: var(--bg-dark);
  color: var(--text-light);
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: fit-content;
  background: linear-gradient(135deg, var(--bg-dark), #131c31);
  padding-top: 64px;
}

.chat-dashboard {
  display: flex;
  height: calc(100vh - 80px);
  margin: 0 auto;
  width: 1200px; 
  max-width: 95%; 
  padding: 16px;
  gap: 16px;
}

.sidebar {
  width: 320px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
}



.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-header h2 {
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(to right, var(--primary-light), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.action-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: var(--primary);
  transform: translateY(-2px);
}

.search-container {
  padding: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: 10px 16px;
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.search-bar i {
  color: var(--text-muted);
  margin-right: 10px;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-light);
  font-size: 14px;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--text-muted);
}

.features-carousel {
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1px;
}

/* Main Content Area */
.main-content {
  flex: 1;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-avatar {
  position: relative;
  margin-right: 16px;
}

.user-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.user-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: var(--bg-card);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-card);
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: var(--success);
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.user-address {
  font-size: 12px;
  color: var(--text-muted);
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.icon-action {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-action:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 41, 59, 0.2) 100%);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--text-muted);
  padding: 20px;
}

.empty-state img {
  width: 200px; 
  margin-bottom: 24px;
  opacity: 0.8; 
}

.empty-state h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 14px;
  max-width: 280px;
  margin-bottom: 24px;
}

.start-chat-button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.start-chat-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.message-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.date-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: var(--text-muted);
  font-size: 12px;
}

.date-divider::before,
.date-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.date-divider span {
  padding: 0 12px;
}

.message-item {
  display: flex;
  max-width: 70%;
  align-items: flex-end;
  gap: 8px;
}

.message-item.sent {
  align-self: flex-end;
}

.message-item.received {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.message-item.sent .message-content {
  background: var(--primary-dark);
  border-bottom-right-radius: 4px;
}

.message-item.received .message-content {
  background: var(--bg-light);
  border-bottom-left-radius: 4px;
}

.message-content p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
}

.message-status {
  font-size: 12px;
  color: var(--text-muted);
}

/* Message Composer */
.message-composer {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.composer-action {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: var(--text-light);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.composer-action:hover {
  background: rgba(255, 255, 255, 0.1);
}

.message-input-wrapper {
  flex: 1;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
}

.message-input-wrapper input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 16px;
  color: var(--text-light);
  font-size: 15px;
  outline: none;
}

.emoji-button {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 18px;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.emoji-button:hover {
  color: var(--text-light);
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover {
  background: var(--secondary-dark);
  transform: translateY(-2px);
}

.refresh-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-button:hover {
  background: var(--primary-dark);
  transform: rotate(45deg);
}

/* Users Directory */
.users-directory {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.directory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.directory-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.directory-actions {
  display: flex;
  gap: 12px;
}

.filter-button, .refresh-users {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-light);
}

.filter-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.refresh-users {
  background: var(--primary);
  color: white;
}

.refresh-users:hover {
  background: var(--primary-dark);
}

.users-grid {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-directory {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
  text-align: center;
  gap: 16px;
}

.empty-directory i {
  font-size: 48px;
  opacity: 0.5;
}

.user-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.user-card-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
}

.user-card-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Info Sidebar */
.info-sidebar {
  width: 300px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.close-sidebar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
}

.user-profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-image {
  margin-bottom: 16px;
}

.profile-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.user-profile-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.wallet-id {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 16px;
  word-break: break-all;
}

.profile-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.profile-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: var(--text-light);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.profile-action:hover {
  background: rgba(255, 255, 255, 0.1);
}

.profile-action i {
  font-size: 16px;
}

.shared-media, .blockchain-info {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.view-all {
  font-size: 12px;
  color: var(--primary);
  background: transparent;
  border: none;
  cursor: pointer;
}

.media-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-sm);
}

.empty-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
}

.empty-media i {
  font-size: 24px;
}

.empty-media p {
  font-size: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.info-label {
  font-size: 13px;
  color: var(--text-muted);
}

.info-value {
  font-size: 13px;
}

.view-on-etherscan {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  color: var(--primary);
  font-size: 13px;
  text-decoration: none;
}

.view-on-etherscan:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media screen and (max-width: 1200px) {
  .info-sidebar {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .chat-dashboard {
    flex-direction: column;
    height: auto;
    gap: 12px;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
  
  .main-content {
    height: auto;
  }
  
  .user-address {
    max-width: 150px;
  }
  
  .message-item {
    max-width: 85%;
  }
}

@media screen and (max-width: 480px) {
  .chat-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .chat-actions {
    align-self: flex-end;
  }
  
  .message-composer {
    padding: 12px;
  }
  
  .composer-action, .send-button, .refresh-button {
    width: 36px;
    height: 36px;
  }
}
</style>