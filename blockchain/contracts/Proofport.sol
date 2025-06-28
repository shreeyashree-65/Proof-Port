// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofPort {
    struct Supplier {
        string name;
        string idNumber;
        string proofHash; // Could be an IPFS CID or NFT metadata hash
        address certifier;
        bool isApproved;
        bool exists;
    }

    mapping(address => Supplier) public suppliers;
    mapping(address => bool) public approvedCertifiers;

    address public owner;

    // Events
    event SupplierRegistered(address indexed supplier, string name, string idNumber, string proofHash);
    event ProofApproved(address indexed supplier, address indexed certifier);
    event ProofRevoked(address indexed supplier);
    event ProofUpdated(address indexed supplier, string newProofHash);
    event CertifierAdded(address indexed certifier);
    event CertifierRemoved(address indexed certifier);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier onlyCertifier() {
        require(approvedCertifiers[msg.sender], "Not an approved certifier");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Owner functions to manage certifiers
    function addCertifier(address _certifier) external onlyOwner {
        approvedCertifiers[_certifier] = true;
        emit CertifierAdded(_certifier);
    }

    function removeCertifier(address _certifier) external onlyOwner {
        approvedCertifiers[_certifier] = false;
        emit CertifierRemoved(_certifier);
    }

    // Supplier registers proof
    function registerSupplier(string calldata _name, string calldata _idNumber, string calldata _proofHash) external {
        require(!suppliers[msg.sender].exists, "Supplier already registered");
        suppliers[msg.sender] = Supplier({
            name: _name,
            idNumber: _idNumber,
            proofHash: _proofHash,
            certifier: address(0),
            isApproved: false,
            exists: true
        });

        emit SupplierRegistered(msg.sender, _name, _idNumber, _proofHash);
    }

    // Supplier updates their proof (e.g., new certificate uploaded)
    function updateProof(string calldata _newProofHash) external {
        require(suppliers[msg.sender].exists, "Supplier not registered");
        suppliers[msg.sender].proofHash = _newProofHash;
        suppliers[msg.sender].isApproved = false;
        suppliers[msg.sender].certifier = address(0);

        emit ProofUpdated(msg.sender, _newProofHash);
    }

    // Certifier approves a supplier's proof
    function approveProof(address _supplier) external onlyCertifier {
        require(suppliers[_supplier].exists, "Supplier not registered");
        suppliers[_supplier].isApproved = true;
        suppliers[_supplier].certifier = msg.sender;

        emit ProofApproved(_supplier, msg.sender);
    }

    // Certifier revokes a supplier's proof
    function revokeProof(address _supplier) external onlyCertifier {
        require(suppliers[_supplier].exists, "Supplier not registered");
        require(suppliers[_supplier].isApproved, "Proof not approved");
        suppliers[_supplier].isApproved = false;

        emit ProofRevoked(_supplier);
    }

    // View function to get supplier info
    function getSupplier(address _supplier) external view returns (
        string memory name,
        string memory idNumber,
        string memory proofHash,
        address certifier,
        bool isApproved
    ) {
        require(suppliers[_supplier].exists, "Supplier not registered");
        Supplier storage s = suppliers[_supplier];
        return (
            s.name,
            s.idNumber,
            s.proofHash,
            s.certifier,
            s.isApproved
        );
    }
}
