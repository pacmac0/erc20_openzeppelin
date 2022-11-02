export interface NetworkConfigItem {
	blockConfirmations?: number
}

export interface NetworkConfigInfo {
	[key: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigInfo = {
	localhost: {},
	hardhat: {},
	rinkeby: { blockConfirmations: 6 },
	mainnet: { blockConfirmations: 6 },
}

export const developmentChains = ["hardhat", "localhost"]
export const INITIAL_SUPPLY = "100000000000000000000000" //1000 tokens
