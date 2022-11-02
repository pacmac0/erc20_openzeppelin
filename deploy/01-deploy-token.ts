import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains, INITIAL_SUPPLY } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployERC20: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	// @ts-ignore
	const { deployments, getNamedAccounts, network } = hre
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const chainId: number = network.config.chainId!

	const myToken = await deploy("MyErc20Token", {
		from: deployer,
		args: [INITIAL_SUPPLY],
		log: true,
		// we need to wait if on a live network so we can verify properly
		waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
	})
	log(`My ERC-20 Token deployed at: ${myToken.address}`)

	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		await verify(myToken.address, [INITIAL_SUPPLY])
	}
}

export default deployERC20
deployERC20.tags = ["all", "erc20"]
