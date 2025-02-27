<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <NavBar/>
    <div class="float-container">
        <div class="float-parent1">
          <div class="float-child_top">
            <span class="Chats_text">Chats</span>
            <button @click="showAllUsers()">
              <i v-if="!userShown" class="fa-solid fa-user-plus"></i>
              <i v-else class="fa-solid fa-x"></i>
            </button>
          </div>
          <div class="float-child1">
            <button  description="search here" aria-label="search here" type="submit" description-position="top" ><i class="fas fa-search"></i> </button>
            <input type="text" class="search_text" placeholder="search...">
          </div>
          <div class="features">
            <FeatureCard></FeatureCard>
          </div>
        </div>
        <div class="float-parent2">
          <div v-if="!userShown" class="float-child2">
            <div class="toggle_content">
                 <label v-if="chatUserRef.currentName!=''" class="toggle_label">
                     <input type="checkbox" class="toggle_check" checked>
                     <div class="toggle_rail">
                          <span class="toggle_circle"></span>
                          <span class="toggle_border"></span>
                      </div>
                 </label>
                </div>
              <div class="float-circle">
                <img v-if="chatUserRef.currentName!=''" :src="`https://ui-avatars.com/api/?name=${chatUserRef.currentName}&size=40&rounded=true&bold=true&background=1a18186b&color=fff`" class="avatar" />
              </div>
            <div class="float-child3">
              <span class="Useraddress">{{chatUserRef.currentName}}</span>
            </div>
              <div class="float-child4">
                <span class="walletaddress">{{ chatUserRef.currentAddress }}</span>
              </div>
          </div>
          <div v-if="!userShown" class="float-child2-Cont">
            <div class="messages-content">
              <div v-if="messages.length === 0" class="no-messages">
                <img src="/src/assets/onboard_splash_chatDapp.svg"  alt="onBoardSVG" class="onBoardSVG"/>
                No messages yet. Start chatting!
              </div>
              <div v-for="(message, index) in messages" :key="index" :class="[isSentMessage(message) ? 'sent-message' : 'received-message']">
                {{ message[2] }}
              </div>
            </div>
          </div>
          <div v-if="!userShown" class="float-child2-chat">
            <button v-if="chatUserRef.currentName!=''" type="submit" class="fetchMessages" @click="fetchMessages"><i class="fa-solid fa-arrows-rotate"></i></button>
            <input v-if="chatUserRef.currentName!=''" type="text" class="chatInput" placeholder="Message...">
            <button v-if="chatUserRef.currentName!=''" type="submit" class="message-submit" @click="sendMessage"><i class="fa-solid fa-paper-plane"></i></button>
          </div>
          <div v-if="userShown" class="allUserHeader">
            <span class="allUserHeading">All Registered Users</span>
          </div>
          <div class="allUserContainer">
            <div v-if="testData.length==0 && userShown" class="no-Users">
              Connect Wallet and 
              <button @click="fetchUsers">
                refresh
                <span><i class="fa-solid fa-arrows-rotate"></i></span>
              </button>
            </div>
            <div class="allUsers" v-if="userShown" v-for="(user,index) in testData" :key="index">
              <infoCards @close-users="closeUsers" :username="user.name" :useraddress="user.accountAddress"/>
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
  components: { NavBar, infoCards , FriendInfo},
  data() {
    return {
      userShown: ref(false),
      testData : ref([]),
      chatUserRef: ref(chatUser),
      messages: ref([]),
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
    async fetchUsers() {
      const Users = await getAllAppUsers();
      console.log("Mounted Baby");
      // const users = Users.map((user) => ({
      //   name: user.name,
      //   accountAddress: user.accountAddress,
      // }))
      if(Users) {
        this.testData= Users;
      }
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
.float-container { 
display:flex;
width: 1200px;
height: max-content;
justify-content: left;
align-items: center;   
padding: 20px;
}

.float-parent1{
  width: 350px;
    height: 500px;
    left:10px;
    float: left;
    padding: 20px;
    border: 2px solid rgba(220, 18, 18, 0);
} 
.float-parent2{
    width: 1000px;
    height: 500px;
    float: right;
    padding: 0px;
    border: 2px solid rgba(238, 234, 234, 0);
}

.float-child_top {
  width: 300px;
  display:flex;
  justify-content:space-between;
  padding-bottom: 10px;
}
.float-child_top span {
  align-items:center;
  font-size: 25px;
}
.float-child_top button {
  font-size:smaller;
  align-items: center;
  font-weight: 500;
  border-radius: 60px;
  width:auto;
  display: flex;
  background-color: #ffffff16;
}
.float-child_top button i {
  align-items: center;
}
.float-child_top button:hover {
  background-color: #ffffff21;
}
.float-parent2,.float-parent1{
    background: #ffffff21;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    margin: 10px;
    transition: filter 300ms;
  }

 .float-child1{
  width:300px;
  height:10%;
  background: #ffffff21;
  backdrop-filter: blur( 4px );
  border-radius: 9px;
 }

 .onBoardSVG {
  width: 100%;
  height: 300px;
  filter: grayscale(70%);
 }

 .float-child2{ 
  width:100%;
  height:10%;
  background: #ffffff21;
  backdrop-filter: blur( 4px );
  border-radius: 10px;
 }
.float-child2-Cont {
  flex: 1 1 auto;
  width:100%;
  height: 80%;
  position:relative;
  overflow-y: scroll;
}
.messages-content {
    display: flex;
    flex-direction: column;
    align-items:flex-end;
    padding: 10px;
}
.sent-message {
  margin-bottom: 10px;
  width:max-content;
  padding: 10px;
  background-color: #ffffff16;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.received-message {
  margin-bottom: 10px;
  align-self: flex-start;
  width:max-content;
  padding: 10px;
  background-color: #792727a0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.no-messages {
  text-align: center;
  align-self: center;
  color: #bdb7b7;
  margin-top: 20px;
  font-size: 18px;
}
.no-users {
  text-align: center;
  align-items:center;
  padding: 20%;
  align-self: center;
  color: #bdb7b7;
  margin-top: 100px;
  font-size: 18px;
}

 .float-child2-chat {
  width:100%;
  height:10%;
  background: #ffffff21;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  border-radius: 10px;
 }

 .chatInput {
  background-color: transparent;
  border-color: #121111;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;
  color: white;
  font-size: 16px;  
  width: 70%;
 } 

 .fetchMessages {
  margin:5px;
  width: 40px;
  height: 40px;
  color: #fff;
  border: none;
  background: #248A52;
  font-size: 16px;
  align-self: center;
  padding: 6px 10px; 
  border-radius: 10px;
  outline: none!important;
  transition: background .2s ease;
 }
 
.message-submit {
  margin:5px;
  width: 40px;
  height: 40px;
  position: absolute;
  color: #fff;
  border: none;
  background: #248A52;
  font-size: 16px;
  align-self: center;
  padding: 6px 10px; 
  border-radius: 10px;
  outline: none!important;
  transition: background .2s ease;
}

.message-submit:hover {
  background: #1D7745;
}

 .chatInput:focus {
  outline: none;
 }

 .allUserHeader {
  color: hsl(0, 0%, 80%);
 }
 .allUserContainer {
  height:95%;
  width:100%;
  overflow-y: auto;
 }
 
 .float-child1 button {
  width: auto;
  background-color: transparent;
 }

 .float-child1 input:focus {
  outline:none;
 }
.search_text{
  height:20px;
  width:80%;
  font-family: inherit;
  padding:22px;
  border:solid 0px#ffffff00;
  color:#eee5e5;
  background-color:transparent;
  font-size: 16px;
}
.float-child3{
  width:200px;
  height:20px;
  margin:auto;
  background:transparent;
  border-radius: 9px;
}
.Useraddress{
  color:#bdb7b7;
}
.float-child4{
  width:450px;
  height:25px;
  margin:auto;
  background:transparent;
  border-radius: 9px;
}
.float-circle{
  width:auto;
  height:auto;
  align-items: center;
  cursor:pointer;
  float:left;
  margin:2px;
  margin-left: 5px;
}

.toggle_content {
  display: grid;
  float:inline-end;
  padding:20px;
}
.toggle_label {
  cursor: pointer;
}
.toggle_check {
  display: none;
}
.toggle_rail {
  position: relative;
  width: 32px;
  height: 4px;
  background-color:rgba(238, 213, 175, 0.964);
  border-radius: 2rem;
}
.toggle_circle {
  display: block;
  width: 15px;
  height: 15px;
  background-color:rgb(179, 119, 220);
  box-shadow: inset 0 0 0 4px pink;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: transform .4s, box-shadow .4s;
  z-index: 2;
}
.toggle_border {
  position: absolute;
  width: 22px;
  height: 22px;
  background-color:rgba(118, 73, 5, 0.853);
  border-radius: 50%;
  left: -4px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: transform .4s;
}
.toggle_check:checked ~ .toggle_rail .toggle_circle {
  transform: translateX(28px);
  box-shadow: inset 0 0 0 12px var(--active-color);
}
.toggle_check:checked ~ .toggle_rail .toggle_border {
  transform: translateX(28px);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
  
  body{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
    background-color:var(--body-color); 
  }
  @media screen and (max-width: 768px) {
    .float-container {
      margin-top : 100px;
      flex-direction: column;
      width: 400px;
      align-items : center;
      justify-content : center;
      height: 100%;
    }
    .float-parent1, .float-parent2 {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
    }
    .float-child1 {
      width: 100%;
    }
    .float-child_top {
      width: 100%;
      justify-content: space-between;
    }
    .search_text {
      width: 100%;
    }
    .float-child2 {
      width: 100%;
    }
    .float-child2-Cont {
      width: 100%;
      height: 300px;
    }
    .float-child2-chat {
      width: 100%;
    }
    .walletaddress {
      margin-right: 25%;
      font-size :small;
    }
    .chatInput {
      width: 80%;
    }
    .message-submit {
      position: relative;
    }
    .allUserHeader {
      width: 100%;
      margin-top: 10px;
    }
    .allUserContainer {
      height: auto;
    }
    .allUsers {
      margin-bottom: 10px;
    }
  }
  </style>