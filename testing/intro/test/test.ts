import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network, upgrades } from "hardhat";
import {Storage} from '../typechain'


  describe("Unit contracts tests", () => {
    let owner: SignerWithAddress
    let user1: SignerWithAddress
    let user2: SignerWithAddress
    let storage: Storage
    

    before (async function() {
      [owner, user1, user2] = await ethers.getSigners();
    })

    beforeEach(async function() {
      // Creating a Contract Factory for Storage 
      let Storage = await ethers.getContractFactory("Storage")
      // Deploying the contract (deployment is initiated from the address of owner, 
      // because if we don't use .connect() it takes the first address fro the array (line 15))
      storage = await Storage.deploy()

      await storage.deployed()
    })

    describe("Storage testing" , function () {

    it("should store numbers", async() => {
        console.log("Number before calls, first test case:", await storage.get())

        expect(await storage.get())
        // Calling the function store on our Storage contract
        await storage.store(42);
        // Calling the function get and assigning the return value to num
        const num = await storage.get();

        // Checking whether the num was set to a value we called store() with
        expect(num).to.be.equal(42);

        console.log("Number after calls, first test case:", await storage.get())
    });


    it("should allow other users to store numbers", async() => {
        console.log("Number before calls, second test case:", await storage.get())

        // calling the function store() with an account of user1
        await storage.connect(user1).store(42);
        // assigning value get() function returns to num
        const num = await storage.connect(user2).get();
        // checking whether the value num changed to a value we stored
        expect(num).to.be.equal(42);

        console.log("Number after calls, second test case:", await storage.get())
    })   

    })

  })