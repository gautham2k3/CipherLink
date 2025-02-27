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
  width: 98%;
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
  align-items:center;
  color: #00ffb0;
}

.userName {
  font-size: large;
  color:#fff;
}
.userAddress {
  font-size: medium;
  color:#111010b2
}

.userAddress:hover {
  cursor: copy;
}

.actions button {
  border: none;
  cursor: pointer;
  align-items: center;
  background-color: #1a18186b;
  width:auto;
  height:auto;
  border: 2px solid #00bcd4;
  border-radius: 20px;
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
