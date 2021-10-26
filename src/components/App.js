import React, { Component } from 'react'
// import Navbar from './Navbar'
import Web3 from 'web3';
import CrowdFunding from '../abis/CrowdFunding.json'
import './App.css'
import Home from './home'
import Navbar from './Navbar'
import List from './List';
import Raised from './raised';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()

    const networkData = CrowdFunding.networks[networkId]
    if(networkData){
      const crowdFunding = new web3.eth.Contract(CrowdFunding.abi, networkData.address)
      console.log(crowdFunding)
      this.setState({ crowdFunding })
      const targetAmount = crowdFunding.methods.target();
      this.setState({targetAmount})
      const deadline = crowdFunding.methods.deadline();
      this.setState({deadline})
      const raisedAmount = await crowdFunding.methods.raisedAmount().call();
      this.setState({raisedAmount})
      const noOfContributors = crowdFunding.methods.noOfContributors();
      this.setState({noOfContributors})
      const requestCount = await crowdFunding.methods.noOfRequests().call()
      this.setState({ requestCount })
      console.log(requestCount)
      // Load Posts
      for (var i = 1; i < requestCount; i++) {
        const req = await crowdFunding.methods.requests(i).call()
        console.log(req)
        this.setState({
          requests: [...this.state.requests, req]
        })
      }

    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      crowdFunding: null,
      targetAmount: 0,
      deadline: "",
      raisedAmount: 0,
      noOfContributors: 0,
      requestCount: 0,
      requests: []
    }
     this.createRequest = this.createRequest.bind(this)
     this.sendEth = this.sendEth.bind(this)
  }

  createRequest(description, value, address) {
    this.state.crowdFunding.methods.createRequest(description, value , address).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log(receipt)
    })
  }

  sendEth(amount) {
    this.state.crowdFunding.methods.createRequest().send({ from: this.state.account, value: amount })
    .once('receipt', (receipt) => {
      console.log(receipt)
    })
  }


  

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
       <Home
        targetAmount = {this.state.targetAmount}
        noOfContributors = {this.state.noOfContributors}
        createRequest = {this.createRequest}
       />
       <Raised 
       raisedAmount = {this.state.raisedAmount}
       sendEth = {this.sendEth}/>
       <List requests = {this.state.requests}/>
      </div>
    );
  }
}

export default App;
