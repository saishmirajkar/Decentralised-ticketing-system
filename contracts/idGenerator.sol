// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract idGenerator {
    uint public id;

    function setId(uint x) public {
        id = x * 1000 * 231 + 129;
    }
}
