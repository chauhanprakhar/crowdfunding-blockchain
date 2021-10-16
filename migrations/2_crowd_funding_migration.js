const CrowdFunding = artifacts.require('CrowdFunding')

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(CrowdFunding,3000,3600)
    const crowdFunding = await CrowdFunding.deployed();
}
