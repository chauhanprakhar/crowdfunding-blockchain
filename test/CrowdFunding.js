const CrowdFunding = artifacts.require('./CrowdFunding.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('CrowdFunding', ([deployer, author, reecipient, investor]) => {
    let crowdFunding
    
   before(async () => {
    crowdFunding = await CrowdFunding.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await crowdFunding.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
})

})
