//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface IStaking {
    function stake( uint _amount, address _recipient ) external returns ( bool );
    function claim( address _recipient ) external;
}

contract SeaStakingHelper is Initializable {

    address public staking;
    address public Sea;

    function initialize ( address _staking, address _Sea ) public initializer 
    {
        require( _staking != address(0) );
        staking = _staking;
        require( _Sea != address(0) );
        Sea = _Sea;
    }
    
    function stake( uint _amount ) external {
        IERC20Upgradeable( Sea ).transferFrom( msg.sender, address(this), _amount );
        IERC20Upgradeable( Sea ).approve( staking, _amount );
        IStaking( staking ).stake( _amount, msg.sender );
        IStaking( staking ).claim( msg.sender );
    }
}