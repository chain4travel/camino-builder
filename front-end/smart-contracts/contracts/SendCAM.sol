// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SendCAM {
    uint256 transactionCounter;

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);

    function transfer(address payable _to, string memory _message) external payable {
        // A preferred way of transferring native currency compared to `.send`
        // Reason for that is gas limit that introduces oportunities for reentrancy (Refer to challanges)
        (bool sent, ) = _to.call{value: msg.value}("");
        
        require(sent, "Failed to send CAM");

        transactionCounter++;

        transactions.push(TransferStruct(msg.sender, _to, msg.value, _message, block.timestamp));

        emit Transfer (msg.sender, _to, msg.value, _message, block.timestamp);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
