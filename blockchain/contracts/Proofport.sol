// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofPort {
    uint public proofCount;

    enum Status { Pending, Approved, Rejected }

    struct Proof {
        address supplier;
        address certifier;
        string ipfsHash;
        string description;
        Status status;
        uint timestamp;
    }

    mapping(uint => Proof) public proofs;

    address public owner;
    mapping(address => bool) public isCertifier;

    event ProofSubmitted(uint proofId, address supplier, string ipfsHash);
    event ProofApproved(uint proofId, address certifier);
    event ProofRejected(uint proofId, address certifier);
    event CertifierAdded(address certifier);
    event CertifierRemoved(address certifier);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyCertifier() {
        require(isCertifier[msg.sender], "Not a certifier");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCertifier(address _certifier) external onlyOwner {
        isCertifier[_certifier] = true;
        emit CertifierAdded(_certifier);
    }

    function removeCertifier(address _certifier) external onlyOwner {
        isCertifier[_certifier] = false;
        emit CertifierRemoved(_certifier);
    }

    function submitProof(string memory _ipfsHash, string memory _description) external {
        proofCount++;
        proofs[proofCount] = Proof({
            supplier: msg.sender,
            certifier: address(0),
            ipfsHash: _ipfsHash,
            description: _description,
            status: Status.Pending,
            timestamp: block.timestamp
        });
        emit ProofSubmitted(proofCount, msg.sender, _ipfsHash);
    }

    function approveProof(uint _id) external onlyCertifier {
        Proof storage proof = proofs[_id];
        require(proof.status == Status.Pending, "Proof not pending");
        proof.status = Status.Approved;
        proof.certifier = msg.sender;
        emit ProofApproved(_id, msg.sender);
    }

    function rejectProof(uint _id) external onlyCertifier {
        Proof storage proof = proofs[_id];
        require(proof.status == Status.Pending, "Proof not pending");
        proof.status = Status.Rejected;
        proof.certifier = msg.sender;
        emit ProofRejected(_id, msg.sender);
    }

    function getProof(uint _id) external view returns (
        address supplier,
        address certifier,
        string memory ipfsHash,
        string memory description,
        Status status,
        uint timestamp
    ) {
        Proof storage p = proofs[_id];
        return (p.supplier, p.certifier, p.ipfsHash, p.description, p.status, p.timestamp);
    }
}
