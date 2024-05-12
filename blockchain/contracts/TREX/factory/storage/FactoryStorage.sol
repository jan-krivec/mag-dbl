// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../compliance/modular/IModularCompliance.sol";
import "../../registry/interface/IIdentityRegistry.sol";
import "../../registry/interface/IClaimTopicsRegistry.sol";
import "../../registry/interface/ITrustedIssuersRegistry.sol";


contract FactoryStorage {

    /// the address of the implementation authority contract used in the tokens deployed by the factory
    address internal _implementationAuthority;

    address internal _idFactory;

    /// @dev Identity Registry contract used by the onchain validator system
    address internal _factoryIdentityRegistry;

    address internal _factoryClaimTopicsRegistry;

    address internal _factoryTrustedIssuersRegistry;

    /// @dev Compliance contract linked to the onchain validator system
    address internal _factoryCompliance;

    address internal _factoryIdentityRegistryStorage;

    /// mapping containing info about the token contracts corresponding to salt already used for CREATE2 deployments
    mapping(string => address) public tokenDeployed;
    mapping(address => bool) public tokens;

    string[] public deployedTokens;

}
