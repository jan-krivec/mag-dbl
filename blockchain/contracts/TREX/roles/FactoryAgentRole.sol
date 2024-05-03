pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Roles.sol";

contract FactoryAgentRole is Ownable {
    using Roles for Roles.Role;

    Roles.Role private _identityAgents;
    Roles.Role private _tokenAgents;
    Roles.Role private _dblAgents;

    address[] private _idAgentAddreses;
    address[] private _tokenAgentAddresses;
    address[] private _dblAgentAddresses;

    event IdentityAgentAdded(address indexed _agent);
    event IdentityAgentRemoved(address indexed _agent);
    event TokenAgentAdded(address indexed _agent);
    event TokenAgentRemoved(address indexed _agent);
    event DBLAgentAdded(address indexed _agent);
    event DBLAgentRemoved(address indexed _agent);
    event OwnerSet(address indexed _owner);

    modifier onlyIdentityAgent() {
        require(isIdentityAgent(msg.sender), "IdentityAgentRole: caller does not have the Agent role");
        _;
    }

    modifier onlyTokenAgent() {
        require(isTokenAgent(msg.sender), "TokenAgentRole: caller does not have the Agent role");
        _;
    }

    modifier onlyDBLAgent() {
        require(isDBLAgent(msg.sender), "DBLAgentRole: caller does not have the Agent role");
        _;
    }

    function addDBLAgent(address _agent) public onlyOwner {
        require(_agent != address(0), "invalid argument - zero address");
        _dblAgents.add(_agent);
        _dblAgentAddresses.push(_agent);
        emit DBLAgentAdded(_agent);
    }

    function removeDBLAgent(address _agent) public onlyOwner {
        require(_agent != address(0), "invalid argument - zero address");
        _dblAgents.remove(_agent);
        uint length = _dblAgentAddresses.length;
        for (uint i = 0; i < length; i++) {
            if (_dblAgentAddresses[i] == _agent) {
                _dblAgentAddresses[i] = _dblAgentAddresses[length - 1];
                _dblAgentAddresses.pop();
                break;
            }
        }
        emit DBLAgentRemoved(_agent);
    }

    function setOwner(address _adm) public onlyOwner {
        require(_adm != address(0), "invalid argument - zero address");
        _identityAgents.add(_adm);
        _idAgentAddreses.push(_adm);

        _dblAgents.add(_adm);
        _dblAgentAddresses.push(_adm);

        _tokenAgents.add(_adm);
        _tokenAgentAddresses.push(_adm);
        emit OwnerSet(_adm);
    }

    function addIdentityAgent(address _agent) public onlyOwner virtual{
        require(_agent != address(0), "invalid argument - zero address");
        _identityAgents.add(_agent);
        _idAgentAddreses.push(_agent);
        emit IdentityAgentAdded(_agent);
    }

    function removeIdentityAgent(address _agent) public onlyOwner virtual{
        require(_agent != address(0), "invalid argument - zero address");
        _identityAgents.remove(_agent);
        uint length = _idAgentAddreses.length;
        for (uint i = 0; i < length; i++) {
            if (_idAgentAddreses[i] == _agent) {
                _idAgentAddreses[i] = _idAgentAddreses[length - 1];
                _idAgentAddreses.pop();
                break;
            }
        }
        emit IdentityAgentRemoved(_agent);
    }

    function addTokenAgent(address _agent) public onlyOwner virtual{
        require(_agent != address(0), "invalid argument - zero address");
        _tokenAgents.add(_agent);
        _tokenAgentAddresses.push(_agent);
        emit TokenAgentAdded(_agent);
    }

    function removeTokenAgent(address _agent) public onlyOwner virtual{
        require(_agent != address(0), "invalid argument - zero address");
        _tokenAgents.remove(_agent);
        uint length = _tokenAgentAddresses.length;
        for (uint i = 0; i < length; i++) {
            if (_tokenAgentAddresses[i] == _agent) {
                _tokenAgentAddresses[i] = _tokenAgentAddresses[length - 1];
                _tokenAgentAddresses.pop();
                break;
            }
        }
        emit TokenAgentRemoved(_agent);
    }

    function isIdentityAgent(address _agent) public view returns (bool) {
        return _identityAgents.has(_agent);
    }

    function isTokenAgent(address _agent) public view returns (bool) {
        return _tokenAgents.has(_agent);
    }

    function isDBLAgent(address _agent) public view returns (bool) {
        return _dblAgents.has(_agent);
    }

    function getTokenAgents() external view returns (address[] memory) {
        return _tokenAgentAddresses;
    }

    function getIdentityTokenAgents() external view returns (address[] memory) {
        return _idAgentAddreses;
    }

    function getDBLAgents() external view returns (address[] memory) {
        return _dblAgentAddresses;
    }
}