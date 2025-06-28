const { expect } = require("chai");

describe("ProofPort", function () {
  let ProofPort, proofPort, owner, supplier, certifier;

  beforeEach(async function () {
    [owner, supplier, certifier] = await ethers.getSigners();
    ProofPort = await ethers.getContractFactory("ProofPort");
    proofPort = await ProofPort.deploy();
  });

  it("should set the deployer as the owner", async function () {
    expect(await proofPort.owner()).to.equal(owner.address);
  });

  it("should allow owner to add a certifier", async function () {
    await proofPort.addCertifier(certifier.address);
    expect(await proofPort.approvedCertifiers(certifier.address)).to.equal(true);
  });

  it("should allow supplier to register", async function () {
    await proofPort.connect(supplier).registerSupplier("Supplier A", "12345", "hash123");
    const data = await proofPort.getSupplier(supplier.address);
    expect(data.name).to.equal("Supplier A");
    expect(data.idNumber).to.equal("12345");
    expect(data.proofHash).to.equal("hash123");
    expect(data.isApproved).to.equal(false);
  });
});
