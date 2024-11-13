import { ref } from "vue";

export const chatUser = {
  currentAddress: '',
  currentName: ''
};

export function setUser(name, address) {
  chatUser.currentAddress = address;
  chatUser.currentName = name;
}

export function getUser() {
  return {
    currentAddress: chatUser.currentAddress,
    currentName: chatUser.currentName
  };
}
