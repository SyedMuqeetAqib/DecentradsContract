import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { DecentradsFactory } from "../typechain-types";

async function deployContracts() {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;

  const lockedAmount = ONE_GWEI;
  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  // Contracts are deployed using the first signer/account by default
  const [tempOwner, tempOtherAccount] = await ethers.getSigners();

  const DecentradsFactory = await ethers.getContractFactory(
    "DecentradsFactory"
  );
  const tempDecentradsFactory = await DecentradsFactory.deploy();

  return {
    tempDecentradsFactory,
    tempOwner,
    tempOtherAccount,
  };
}

describe("Decentrads Contract", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let owner: any;
  let decentradsFactory: DecentradsFactory;
  let otherAccount: any;

  before(async () => {
    const { tempDecentradsFactory, tempOwner, tempOtherAccount } =
      await loadFixture(deployContracts);
    decentradsFactory = tempDecentradsFactory;
    owner = tempOwner;
    otherAccount = tempOtherAccount;
  });

  // describe("Deployment", async function () {
  //   it("Voter and applications contract addresses should be zero addresses", async function () {
  //     const applicationContractAddressBefore = await decentradsFactory
  //       .connect(owner)
  //       .getDecentradsApplicationsContract();
  //     console.log(
  //       "file: index.ts ~ line 63 ~ voterAddress",
  //       applicationContractAddressBefore
  //     );
  //     expect(applicationContractAddressBefore).to.equals(
  //       "0x0000000000000000000000000000000000000000"
  //     );
  //     await decentradsMain
  //       .connect(owner)
  //       .setDecentradsApplicationsContract(decentradsApplications.address);
  //     await decentradsMain
  //       .connect(owner)
  //       .setDecentradsVotersContract(decentradsVoters.address);
  //     await decentradsVoters.connect(owner).setDao(decentradsMain.address);
  //     await decentradsApplications
  //       .connect(owner)
  //       .setDao(decentradsMain.address);
  //     const applicationContractAddress = await decentradsMain
  //       .connect(owner)
  //       .getDecentradsApplicationsContract();
  //     const voterContractAddress = await decentradsMain
  //       .connect(owner)
  //       .getDecentradsVotersContract();
  //     console.log(
  //       "file: index.ts ~ line 63 ~ application",
  //       applicationContractAddress == decentradsApplications.address,
  //       voterContractAddress == decentradsVoters.address
  //     );
  //     expect(applicationContractAddress).to.equals(
  //       decentradsApplications.address
  //     );
  //   });
  //   it("Dapp Registeration", async function () {
  //     if (
  //       decentradsApplications.address &&
  //       decentradsMain.address &&
  //       decentradsVoters.address
  //     ) {
  //       const registerDapp = await decentradsMain
  //         .connect(owner)
  //         .registerDapp("asdasd", {
  //           value: ethers.utils.parseUnits("1", "ether"),
  //         });

  //       console.log("file: index.ts ~ line 63 ~ voterAddress", registerDapp);
  //       const getDapp = await decentradsApplications
  //         .connect(owner)
  //         .dappsId(owner.address);
  //       console.log("file: index.ts ~ line 63 ~ voterAddress", getDapp);
  //       expect(getDapp).to.greaterThanOrEqual(0);
  //     }
  //   });
  //   it("Submit Ad Proposal", async function () {
  //     if (
  //       decentradsApplications.address &&
  //       decentradsMain.address &&
  //       decentradsVoters.address
  //     ) {
  //       const dappAd = await decentradsApplications
  //         .connect(owner)
  //         .dappsId(owner.address);
  //       console.log("file: DecentradsMain.ts ~ line 114 ~ dappAd", dappAd);
  //       const submitProposal = await decentradsMain
  //         .connect(owner)
  //         .submitAdProposal(owner.address, 1668149875, "asd", {
  //           value: ethers.utils.parseUnits("1", "ether"),
  //         });
  //       console.log("file: index.ts ~ line 63 ~ voterAddress", submitProposal);
  //       const getDapp = await decentradsApplications
  //         .connect(owner)
  //         .dappsId(owner.address);
  //       console.log("file: index.ts ~ line 63 ~ voterAddress", getDapp);
  //       expect(getDapp).to.greaterThanOrEqual(0);
  //     }
  //   });
  //   // it("Dapp Registeration", async function () {
  //   //   const registerDapp = await decentradsMain
  //   //     .connect(owner)
  //   //     .getDecentradsApplicationsContract();
  //   //   console.log("file: index.ts ~ line 63 ~ voterAddress", registerDapp);
  //   //   const getDapp = await decentradsApplications
  //   //     .connect(owner)
  //   //     .dappsId(owner.address);
  //   //   console.log("file: index.ts ~ line 63 ~ voterAddress", getDapp);
  //   //   expect(getDapp).to.greaterThanOrEqual(0);
  //   // });
  //   //   it("Should set the right owner", async function () {
  //   //     const { lock, owner } = await loadFixture(deployContracts);

  //   //     expect(await lock.owner()).to.equal(owner.address);
  //   //   });

  //   //   it("Should receive and store the funds to lock", async function () {
  //   //     const { lock, lockedAmount } = await loadFixture(deployContracts);

  //   //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
  //   //       lockedAmount
  //   //     );
  //   //   });

  //   //   it("Should fail if the unlockTime is not in the future", async function () {
  //   //     // We don't use the fixture here because we want a different deployment
  //   //     const latestTime = await time.latest();
  //   //     const Lock = await ethers.getContractFactory("Lock");
  //   //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //   //       "Unlock time should be in the future"
  //   //     );
  //   //   });
  //   // });

  //   // describe("Withdrawals", function () {
  //   //   describe("Validations", function () {
  //   //     it("Should revert with the right error if called too soon", async function () {
  //   //       const { lock } = await loadFixture(deployContracts);

  //   //       await expect(lock.withdraw()).to.be.revertedWith(
  //   //         "You can't withdraw yet"
  //   //       );
  //   //     });

  //   //     it("Should revert with the right error if called from another account", async function () {
  //   //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //   //         deployContracts
  //   //       );

  //   //       // We can increase the time in Hardhat Network
  //   //       await time.increaseTo(unlockTime);

  //   //       // We use lock.connect() to send a transaction from another account
  //   //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //   //         "You aren't the owner"
  //   //       );
  //   //     });

  //   //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //   //       const { lock, unlockTime } = await loadFixture(deployContracts);

  //   //       // Transactions are sent using the first signer by default
  //   //       await time.increaseTo(unlockTime);

  //   //       await expect(lock.withdraw()).not.to.be.reverted;
  //   //     });
  //   //   });

  //   //   describe("Events", function () {
  //   //     it("Should emit an event on withdrawals", async function () {
  //   //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //   //         deployContracts
  //   //       );

  //   //       await time.increaseTo(unlockTime);

  //   //       await expect(lock.withdraw())
  //   //         .to.emit(lock, "Withdrawal")
  //   //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //   //     });
  //   //   });

  //   //   describe("Transfers", function () {
  //   //     it("Should transfer the funds to the owner", async function () {
  //   //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //   //         deployContracts
  //   //       );

  //   //       await time.increaseTo(unlockTime);

  //   //       await expect(lock.withdraw()).to.changeEtherBalances(
  //   //         [owner, lock],
  //   //         [lockedAmount, -lockedAmount]
  //   //       );
  //   //     });
  //   //   });
  // });
});
