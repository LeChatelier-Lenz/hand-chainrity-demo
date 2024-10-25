// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    struct User {
        string username;
        bool isRegistered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddress, string username);
    event UserDeregistered(address indexed userAddress);

    // 用户注册
    function registerUser(string memory username) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(username, true);
        emit UserRegistered(msg.sender, username);
    }

    // 检查用户是否注册
    function isUserRegistered(address userAddress) public view returns (bool) {
        return users[userAddress].isRegistered;
    }

    // 获取用户信息
    function getUserInfo(address userAddress) public view returns (string memory username, bool isRegistered) {
        User memory user = users[userAddress];
        return (user.username, user.isRegistered);
    }

    // 用户注销（可选）
    function deregisterUser() public {
        require(users[msg.sender].isRegistered, "User not registered");
        delete users[msg.sender];
        emit UserDeregistered(msg.sender);
    }
}
