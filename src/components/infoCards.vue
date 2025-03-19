<script setup>
import { ref, defineEmits } from 'vue'
import { RouterLink } from 'vue-router';
import { setUser } from '../Utils/userUtils';
import { defineProps } from 'vue';
const userName=ref("Gautham Naidu");
const userAddress=ref("0xd5dE9B5eA158AB77F3F689BC5D156cD62296dCee");

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  useraddress: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close-users']);

function setUserData() {
  console.log("Setting User Data");
  userName.value=props.username;
  userAddress.value=props.useraddress;
  setUser(userName.value,userAddress.value);
  emit('close-users');

}

function copyAddress() {
  navigator.clipboard.writeText(props.useraddress);
  alert("Copied " + props.useraddress);
}

</script>

<template>
  <div class="nameCard">
    <div class="avatarBox">
      <img :src="`https://ui-avatars.com/api/?name=${username}&size=40&rounded=true&bold=true&background=1a18186b&color=fff`" class="avatar" />
    </div>
    <div class="info">
      <span class="userName">{{username}}</span>
      <span @click="copyAddress" class="userAddress">{{useraddress}}</span>
    </div>
    <div class="actions">
      <button @click="setUserData"><i class="fa-solid fa-plus"></i></button>
    </div>
  </div>
</template>

<style>
.nameCard {
  display: flex;
  background-color: hsla(0, 0%, 100%, 0.2);
  width: 94%;
  height: auto;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  margin: 10px;
}

.nameCard:hover {
  background-color: hsla(0, 0%, 100%, 0.3);
}

.avatar {
  outline: none;
  background-color: transparent;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  color: #00ffb0;
  width: 65%; 
  padding: 0 10px; 
  overflow: hidden; 
}

.userName {
  font-size: large;
  color:#fff;
  margin-bottom: 5px;
}

.userAddress {
  font-size: medium;
  color:#b9afaf;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
}

.userAddress:hover {
  cursor: copy;
  text-decoration: underline;
}

.actions button {
  border: none;
  cursor: pointer;
  align-items: center;
  background-color: #1a18186b;
  width:40px;
  height:40px;
  border: 2px solid #00bcd4;
  display: flex;
  border-radius: 20px;
  justify-content: center;
}

.actions button:hover {
  background-color: #368f51;
}

@media only screen and (max-width: 768px) {
  .nameCard {
    display: flex;
    align-items: center;
    width : 95%;
    justify-content: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
  }
  .userName {
    font-size: medium;
  }
  .userAddress {
    align-items:center;
    font-size: 9.5px;
    color: #b9afaf;
  }
  .actions button {
    width: 40px;
    height: 40px;
    border-radius: 30%;
  }
}

</style>
