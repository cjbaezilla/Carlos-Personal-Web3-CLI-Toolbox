// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract Storage {

    uint256 number = 0;
    address sender;

    constructor(uint256 _number, address _sender) {
        number = _number;
        sender = _sender;
    }

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256){
        return number;
    }
}