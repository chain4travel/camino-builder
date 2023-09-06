import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network, upgrades } from "hardhat";
import {Exchange, TokenA, TokenB} from '../typechain'


  describe("Unit contracts tests", () => {
    let owner: SignerWithAddress
    let user1: SignerWithAddress
    let user2: SignerWithAddress
    let exchange: Exchange
    let tokenA: TokenA
    let tokenB: TokenB
    

    before (async function() {
      [owner, user1, user2] = await ethers.getSigners();
    })

    beforeEach(async function() {
      let TokenA = await ethers.getContractFactory("TokenA")
      let TokenB = await ethers.getContractFactory("TokenB")

      tokenA= await TokenA.deploy(ethers.utils.parseEther("5"));
      tokenB = await TokenB.deploy() 

      let Exchange = await ethers.getContractFactory("Exchange")
      exchange = await Exchange.deploy(tokenA.address, tokenB.address)

      await exchange.deployed()

      // Grating exchange an Admin role, which will allow it to mint tokens
      // DEFAULT_ADMIN_ROLE is a bytes32 sequence. We address it the easier way, by retriving it
      // from the tokenB contract
      await tokenB.grantRole(await tokenB.DEFAULT_ADMIN_ROLE(), exchange.address)
    })

    describe("Storage testing" , function () {

    it("should store numbers", async() => {
        console.log("TokenA Balance before", await tokenA.balanceOf(owner.address))
        console.log("TokenB Balance before", await tokenB.balanceOf(owner.address))

        await tokenA.mint(owner.address, ethers.utils.parseEther("50"))

        // Expecting the call to be reverted with the message we specified
        // @notice We don't use await before exchange.swap(), because we don't need for the call to go through to be reverted
        await expect(exchange.swap(ethers.utils.parseEther("5"))).to.be.revertedWith('ERC20: insufficient allowance');

        console.log("TokenA Balance after", await tokenA.balanceOf(owner.address))
        console.log("TokenB Balance after", await tokenB.balanceOf(owner.address))
    });    

    it("should store numbers", async() => {
      console.log("TokenA Balance before", await tokenA.balanceOf(owner.address))
      console.log("TokenB Balance before", await tokenB.balanceOf(owner.address))

      await tokenA.mint(owner.address, ethers.utils.parseEther("50"))

      // Allowing the contract of exchange address to spend 20 tokens on our part
      await tokenA.approve(exchange.address, ethers.utils.parseEther("20"));
      await exchange.swap(ethers.utils.parseEther("5"));

      console.log("TokenA Balance after", await tokenA.balanceOf(owner.address))
      console.log("TokenB Balance after", await tokenB.balanceOf(owner.address))
  });  

    })

  })