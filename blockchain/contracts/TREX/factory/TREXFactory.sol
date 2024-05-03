// SPDX-License-Identifier: GPL-3.0
//
//                                             :+#####%%%%%%%%%%%%%%+
//                                         .-*@@@%+.:+%@@@@@%%#***%@@%=
//                                     :=*%@@@#=.      :#@@%       *@@@%=
//                       .-+*%@%*-.:+%@@@@@@+.     -*+:  .=#.       :%@@@%-
//                   :=*@@@@%%@@@@@@@@@%@@@-   .=#@@@%@%=             =@@@@#.
//             -=+#%@@%#*=:.  :%@@@@%.   -*@@#*@@@@@@@#=:-              *@@@@+
//            =@@%=:.     :=:   *@@@@@%#-   =%*%@@@@#+-.        =+       :%@@@%-
//           -@@%.     .+@@@     =+=-.         @@#-           +@@@%-       =@@@@%:
//          :@@@.    .+@@#%:                   :    .=*=-::.-%@@@+*@@=       +@@@@#.
//          %@@:    +@%%*                         =%@@@@@@@@@@@#.  .*@%-       +@@@@*.
//         #@@=                                .+@@@@%:=*@@@@@-      :%@%:      .*@@@@+
//        *@@*                                +@@@#-@@%-:%@@*          +@@#.      :%@@@@-
//       -@@%           .:-=++*##%%%@@@@@@@@@@@@*. :@+.@@@%:            .#@@+       =@@@@#:
//      .@@@*-+*#%%%@@@@@@@@@@@@@@@@%%#**@@%@@@.   *@=*@@#                :#@%=      .#@@@@#-
//      -%@@@@@@@@@@@@@@@*+==-:-@@@=    *@# .#@*-=*@@@@%=                 -%@@@*       =@@@@@%-
//         -+%@@@#.   %@%%=   -@@:+@: -@@*    *@@*-::                   -%@@%=.         .*@@@@@#
//            *@@@*  +@* *@@##@@-  #@*@@+    -@@=          .         :+@@@#:           .-+@@@%+-
//             +@@@%*@@:..=@@@@*   .@@@*   .#@#.       .=+-       .=%@@@*.         :+#@@@@*=:
//              =@@@@%@@@@@@@@@@@@@@@@@@@@@@%-      :+#*.       :*@@@%=.       .=#@@@@%+:
//               .%@@=                 .....    .=#@@+.       .#@@@*:       -*%@@@@%+.
//                 +@@#+===---:::...         .=%@@*-         +@@@+.      -*@@@@@%+.
//                  -@@@@@@@@@@@@@@@@@@@@@@%@@@@=          -@@@+      -#@@@@@#=.
//                    ..:::---===+++***###%%%@@@#-       .#@@+     -*@@@@@#=.
//                                           @@@@@@+.   +@@*.   .+@@@@@%=.
//                                          -@@@@@=   =@@%:   -#@@@@%+.
//                                          +@@@@@. =@@@=  .+@@@@@*:
//                                          #@@@@#:%@@#. :*@@@@#-
//                                          @@@@@%@@@= :#@@@@+.
//                                         :@@@@@@@#.:#@@@%-
//                                         +@@@@@@-.*@@@*:
//                                         #@@@@#.=@@@+.
//                                         @@@@+-%@%=
//                                        :@@@#%@%=
//                                        +@@@@%-
//                                        :#%%=
//
/**
 *     NOTICE
 *
 *     The T-REX software is licensed under a proprietary license or the GPL v.3.
 *     If you choose to receive it under the GPL v.3 license, the following applies:
 *     T-REX is a suite of smart contracts implementing the ERC-3643 standard and
 *     developed by Tokeny to manage and transfer financial assets on EVM blockchains
 *
 *     Copyright (C) 2023, Tokeny sàrl.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
pragma solidity 0.8.17;

import "../roles/AgentRole.sol";
import "../token/IToken.sol";
import "../registry/interface/IClaimTopicsRegistry.sol";
import "../registry/interface/IIdentityRegistry.sol";
import "../compliance/modular/IModularCompliance.sol";
import "../registry/interface/ITrustedIssuersRegistry.sol";
import "../registry/interface/IIdentityRegistryStorage.sol";
import "../proxy/authority/ITREXImplementationAuthority.sol";
import "../proxy/TokenProxy.sol";
import "../proxy/ClaimTopicsRegistryProxy.sol";
import "../proxy/IdentityRegistryProxy.sol";
import "../proxy/IdentityRegistryStorageProxy.sol";
import "../proxy/TrustedIssuersRegistryProxy.sol";
import "../proxy/ModularComplianceProxy.sol";
import "./ITREXFactory.sol";
import "@onchain-id/solidity/contracts/factory/IIdFactory.sol";
import "./storage/FactoryStorage.sol";
import "../roles/FactoryAgentRole.sol";


contract TREXFactory is ITREXFactory, FactoryAgentRole, FactoryStorage {


   function addIdentityAgent(address _agent) public onlyOwner override{
       super.addIdentityAgent(_agent);
       AgentRole(address(_factoryIdentityRegistry)).addAgent(_agent);
   }

   function removeIdentityAgent(address _agent) public onlyOwner override{
       super.removeIdentityAgent(_agent);
       AgentRole(address(_factoryIdentityRegistry)).removeAgent(_agent);
   }

   function addTokenAgent(address _agent) public onlyOwner override{
       super.addTokenAgent(_agent);
       for (uint i = 0; i < deployedTokens.length; i++) {
           AgentRole(getTokenInternal(deployedTokens[i])).addAgent(_agent);
       }
   }

   function removeTokenAgent(address _agent) public onlyOwner override{
       super.removeTokenAgent(_agent);
       for (uint i = 0; i < deployedTokens.length; i++) {
           AgentRole(getTokenInternal(deployedTokens[i])).removeAgent(_agent);
       }
   }


    /// constructor is setting the implementation authority and the Identity Factory of the TREX factory
    constructor(address implementationAuthority_, address idFactory_) {

        setImplementationAuthority(implementationAuthority_);
        setIdFactory(idFactory_);


        _factoryTrustedIssuersRegistry = ITrustedIssuersRegistry(_deployTIR("factory", _implementationAuthority));
        _factoryClaimTopicsRegistry = IClaimTopicsRegistry(_deployCTR("factory", _implementationAuthority));
        _factoryCompliance = IModularCompliance(_deployMC("factory", _implementationAuthority));
        IIdentityRegistryStorage irs = IIdentityRegistryStorage(_deployIRS("factory", _implementationAuthority));
        _factoryIdentityRegistry = IIdentityRegistry(_deployIR("factory", _implementationAuthority, address(_factoryTrustedIssuersRegistry),
            address(_factoryClaimTopicsRegistry), address(irs)));
        irs.bindIdentityRegistry(address(_factoryIdentityRegistry));
    }

    function setAgents(AgentDetails calldata _agentDetails) external override onlyOwner{
        for (uint256 i = 0; i < (_agentDetails.irAgents).length; i++) {
            addIdentityAgent(_agentDetails.irAgents[i]);
        }
        for (uint256 i = 0; i < (_agentDetails.tokenAgents).length; i++) {
            addTokenAgent(_agentDetails.tokenAgents[i]);
        }
        for (uint256 i = 0; i < (_agentDetails.dblAgents).length; i++) {
            addDBLAgent(_agentDetails.dblAgents[i]);
        }
        emit AgentsSet(_agentDetails.irAgents, _agentDetails.tokenAgents, _agentDetails.dblAgents);
    }

    /**
     *  @dev See {ITREXFactory-deployTREXSuite}.
     */
    // solhint-disable-next-line code-complexity, function-max-lines
    function deployTREXSuite(string memory _salt, TokenDetails calldata _tokenDetails)
    external override onlyTokenAgent {
        require(tokenDeployed[_salt] == address(0)
        , "token already deployed");
        require((_tokenDetails.complianceModules).length <= 30
        , "max 30 module actions at deployment");
        require((_tokenDetails.complianceModules).length >= (_tokenDetails.complianceSettings).length
        , "invalid compliance pattern");

        IModularCompliance mc = IModularCompliance(_deployMC(_salt, _implementationAuthority));
        IToken token = IToken(_deployToken
            (
                _salt,
                _implementationAuthority,
                address(_factoryIdentityRegistry),
                address(mc),
                _tokenDetails.name,
                _tokenDetails.symbol,
                _tokenDetails.decimals,
                address(0)
            ));

        address _tokenID = IIdFactory(_idFactory).createTokenIdentity(address(token), owner(), _salt);
        token.setOnchainID(_tokenID);

        address[] memory tokenAgents = FactoryAgentRole(address(this)).getTokenAgents();

        for (uint256 i = 0; i < tokenAgents.length; i++) {
            AgentRole(address(token)).addAgent(tokenAgents[i]);
        }
        for (uint256 i = 0; i < (_tokenDetails.complianceModules).length; i++) {
            if (!mc.isModuleBound(_tokenDetails.complianceModules[i])) {
                mc.addModule(_tokenDetails.complianceModules[i]);
            }
            if (i < (_tokenDetails.complianceSettings).length) {
                mc.callModuleFunction(_tokenDetails.complianceSettings[i], _tokenDetails.complianceModules[i]);
            }
        }
        tokenDeployed[_salt] = address(token);
        deployedTokens.push(_salt);
        (Ownable(address(token))).transferOwnership(owner());
        emit TREXSuiteDeployed(address(token), address(mc), _salt);
    }

    /**
     *  @dev See {ITREXFactory-recoverContractOwnership}.
     */
    function recoverContractOwnership(address _contract, address _newOwner) external override onlyOwner {
        (Ownable(_contract)).transferOwnership(_newOwner);
    }

    /**
     *  @dev See {ITREXFactory-getImplementationAuthority}.
     */
    function getImplementationAuthority() external override view returns(address) {
        return _implementationAuthority;
    }

    function getTrustedIssuersRegistry() external view returns(address) {
        return address(_factoryTrustedIssuersRegistry);
    }

    function getClaimTopicsRegistry() external view returns(address) {
        return address(_factoryClaimTopicsRegistry);
    }

    function getIdentityRegirstry() external view returns(address) {
        return address(_factoryIdentityRegistry);
    }

    function getModularCompliance() external view returns(address) {
        return address(_factoryCompliance);
    }

    /**
     *  @dev See {ITREXFactory-getIdFactory}.
     */
    function getIdFactory() external override view returns(address) {
        return _idFactory;
    }

    /**
     *  @dev See {ITREXFactory-getToken}.
     */
    function getToken(string calldata _salt) external override view returns(address) {
        return tokenDeployed[_salt];
    }

    function getTokenInternal(string memory _salt) private view returns(address) {
        return tokenDeployed[_salt];
    }

    function getTokens() external view returns(string[] memory) {
        return deployedTokens;
    }

    /**
     *  @dev See {ITREXFactory-setImplementationAuthority}.
     */
    function setImplementationAuthority(address implementationAuthority_) public override onlyOwner {
        require(implementationAuthority_ != address(0), "invalid argument - zero address");
        // should not be possible to set an implementation authority that is not complete
        require(
            (ITREXImplementationAuthority(implementationAuthority_)).getTokenImplementation() != address(0)
            && (ITREXImplementationAuthority(implementationAuthority_)).getCTRImplementation() != address(0)
            && (ITREXImplementationAuthority(implementationAuthority_)).getIRImplementation() != address(0)
            && (ITREXImplementationAuthority(implementationAuthority_)).getIRSImplementation() != address(0)
            && (ITREXImplementationAuthority(implementationAuthority_)).getMCImplementation() != address(0)
            && (ITREXImplementationAuthority(implementationAuthority_)).getTIRImplementation() != address(0),
            "invalid Implementation Authority");
        _implementationAuthority = implementationAuthority_;
        emit ImplementationAuthoritySet(implementationAuthority_);
    }

    /**
     *  @dev See {ITREXFactory-setIdFactory}.
     */
    function setIdFactory(address idFactory_) public override onlyOwner {
        require(idFactory_ != address(0), "invalid argument - zero address");
        _idFactory = idFactory_;
        emit IdFactorySet(idFactory_);
    }

    /// deploy function with create2 opcode call
    /// returns the address of the contract created
    function _deploy(string memory salt, bytes memory bytecode) private returns (address) {
        bytes32 saltBytes = bytes32(keccak256(abi.encodePacked(salt)));
        address addr;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            let encoded_data := add(0x20, bytecode) // load initialization code.
            let encoded_size := mload(bytecode)     // load init code's length.
            addr := create2(0, encoded_data, encoded_size, saltBytes)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        emit Deployed(addr);
        return addr;
    }

    /// function used to deploy a trusted issuers registry using CREATE2
    function _deployTIR
    (
        string memory _salt,
        address implementationAuthority_
    ) private returns (address){
        bytes memory _code = type(TrustedIssuersRegistryProxy).creationCode;
        bytes memory _constructData = abi.encode(implementationAuthority_);
        bytes memory bytecode = abi.encodePacked(_code, _constructData);
        return _deploy(_salt, bytecode);
    }

    /// function used to deploy a claim topics registry using CREATE2
    function  _deployCTR
    (
        string memory _salt,
        address implementationAuthority_
    ) private returns (address) {
        bytes memory _code = type(ClaimTopicsRegistryProxy).creationCode;
        bytes memory _constructData = abi.encode(implementationAuthority_);
        bytes memory bytecode = abi.encodePacked(_code, _constructData);
        return _deploy(_salt, bytecode);
    }

    /// function used to deploy modular compliance contract using CREATE2
    function  _deployMC
    (
        string memory _salt,
        address implementationAuthority_
    ) private returns (address) {
        bytes memory _code = type(ModularComplianceProxy).creationCode;
        bytes memory _constructData = abi.encode(implementationAuthority_);
        bytes memory bytecode = abi.encodePacked(_code, _constructData);
        return _deploy(_salt, bytecode);
    }

    /// function used to deploy an identity registry storage using CREATE2
    function _deployIRS
    (
        string memory _salt,
        address implementationAuthority_
    ) private returns (address) {
        bytes memory _code = type(IdentityRegistryStorageProxy).creationCode;
        bytes memory _constructData = abi.encode(implementationAuthority_);
        bytes memory bytecode = abi.encodePacked(_code, _constructData);
        return _deploy(_salt, bytecode);
    }

    /// function used to deploy an identity registry using CREATE2
    function _deployIR
    (
        string memory _salt,
        address implementationAuthority_,
        address _trustedIssuersRegistry,
        address _claimTopicsRegistry,
        address _identityStorage
    ) private returns (address) {
        bytes memory _code = type(IdentityRegistryProxy).creationCode;
        bytes memory _constructData = abi.encode
        (
            implementationAuthority_,
            _trustedIssuersRegistry,
            _claimTopicsRegistry,
            _identityStorage
        );
        bytes memory bytecode = abi.encodePacked(_code, _constructData);
        return _deploy(_salt, bytecode);
    }

    /// function used to deploy a token using CREATE2
    function _deployToken
    (
        string memory _salt,
        address implementationAuthority_,
        address _identityRegistry,
        address _compliance,
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _onchainId
    ) private returns (address) {
        bytes memory _code = type(TokenProxy).creationCode;
        bytes memory _constructData = abi.encode
        (
            implementationAuthority_,
            _identityRegistry,
            _compliance,
            _name,
            _symbol,
            _decimals,
            _onchainId
        );
        bytes memory bytecode = abi.encodePacked(_code, _constructData);
        return _deploy(_salt, bytecode);
    }
}
