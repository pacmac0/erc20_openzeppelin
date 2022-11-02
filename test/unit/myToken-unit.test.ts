import { assert, expect } from "chai"
import { deployments, ethers } from "hardhat"
import { INITIAL_SUPPLY } from "../../helper-hardhat-config"
import { MyErc20Token } from "../../typechain-types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

describe("MyErc20Token Unit Test", function () {
	let myErc20Token: MyErc20Token, deployer: SignerWithAddress, user1: SignerWithAddress
	beforeEach(async function () {
		const accounts = await ethers.getSigners()
		deployer = accounts[0]
		user1 = accounts[1]

		await deployments.fixture("all")
		myErc20Token = await ethers.getContract("MyErc20Token", deployer)
	})

	it("Should have correct INITIAL_SUPPLY of token ", async function () {
		const totalSupply = await myErc20Token.totalSupply()
		assert.equal(totalSupply.toString(), INITIAL_SUPPLY)
	})

	it("Should be able to transfer tokens successfully to an address", async function () {
		const tokensToSend = ethers.utils.parseEther("10")
		await myErc20Token.transfer(user1.address, tokensToSend)
		expect(await myErc20Token.balanceOf(user1.address)).to.equal(tokensToSend)
	})

	it("Should approve other address to spend token", async () => {
		const tokensToSpend = ethers.utils.parseEther("5")
		await myErc20Token.approve(user1.address, tokensToSpend)
		const myErc20Token1 = await ethers.getContract("MyErc20Token", user1)
		await myErc20Token1.transferFrom(deployer.address, user1.address, tokensToSpend)
		expect(await myErc20Token1.balanceOf(user1.address)).to.equal(tokensToSpend)
	})
})
