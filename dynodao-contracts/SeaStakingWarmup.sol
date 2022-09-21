//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract SeaStakingWarmup is Initializable {

    address public staking;
    address public Wave;

    function  initialize ( address _staking, address _Wave )  public initializer 
    {
        require( _staking != address(0) );
        staking = _staking;
        require( _Wave != address(0) );
        Wave = _Wave;
    }

    function retrieve( address _staker, uint _amount ) external {
        require( msg.sender == staking );
        IERC20Upgradeable( Wave ).transfer( _staker, _amount );
    }
}