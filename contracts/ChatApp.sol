// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatApp {
    struct Friend {
        address pubkey;
        string name;
    }

    struct User {
        string name;
        Friend[] friendList;
    }

    struct AllUsersStruct {
        string name;
        address accountAddress;
    }

    AllUsersStruct[] public getAllUsers;

    struct Message {
        address sender;
        uint256 timestamp;
        string content;
    }
    
    mapping(address => User) private userList;
    mapping(bytes32 => Message[]) private allMessages; // Change to array of messages

    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    function createAccount(string calldata name) external {
        require(!checkUserExists(msg.sender), "User Already Exists");
        require(bytes(name).length > 0, "Name cannot be empty");
        userList[msg.sender].name = name;
        getAllUsers.push(AllUsersStruct(name, msg.sender));
    }

    function getUserName() external view returns (string memory) {
        require(checkUserExists(msg.sender), "User does not exist");
        return userList[msg.sender].name;
    }

    function getAllAppUsers() external view returns (AllUsersStruct[] memory) {
        return getAllUsers;
    }

    function _getChatCode(address add1, address add2) internal pure returns (bytes32) {
        if (add1 < add2) {
            return keccak256(abi.encodePacked(add1, add2));
        } else {
            return keccak256(abi.encodePacked(add2, add1));
        }
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an Account");
        require(checkUserExists(friend_key), "Friend Not Registered");
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        Message memory newMsg = Message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg); 
    }

    function readMessage(address friend_key) external view returns(Message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }
}
