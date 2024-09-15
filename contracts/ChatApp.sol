// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatApp {
    struct user{
        string name;
        friend[] friendList;
    }
    struct friend {
        address pubkey;
        string name;
    }

    struct AllUsersStruck {
        string name;
        address accountAddress;
    }

    AllUsersStruck[] getAllUsers;

    struct message {
        address sender;
        string content;
        uint64 timestamp;
    }
    
    mapping (address => user) userList;
    mapping (bytes32 => message) allMessages;

    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length>0;
    }

    function createAccount(string calldata name)external {
        require(checkUserExists(msg.sender)==false, "User Already Exists");
        require(bytes(name).length>0, "Name cannot be empty");
        userList[msg.sender].name=name;
        getAllUsers.push(AllUsersStruck(name,msg.sender));
    }

    function getUserName() external view returns(string memory) {
        require(checkUserExists(msg.sender),"User does not exist");
        
        return userList[msg.sender].name;
    }

    function getAllAppUsers() public view returns (AllUsersStruck[] memory) {
        return getAllUsers;
    }

}