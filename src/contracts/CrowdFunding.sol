pragma solidity ^0.5.0;

contract CrowdFunding{
    mapping(address => uint) public contributors;
    address public admin;
    uint public target;
    uint public deadline;
    uint public minimumContributions;
    uint public raisedAmount;
    uint public noOfContributors;
    
    constructor(uint _target,uint _deadline) public {
        admin = msg.sender;
        target = _target;
        minimumContributions = 100 wei;
        deadline = block.timestamp + _deadline;
    }
    
    struct Request{
        string description;
        address payable recipient;
        uint value;
        bool isComplete;
        uint noOfVoters;
        mapping(address => bool) voters;
    }
    
    mapping(uint => Request) public requests; 
    uint public numRequests;
    
    function sendEth() public payable{
        require(deadline > block.timestamp, "deadline has passed");
        require(minimumContributions > msg.value , "Minimum contribution is not met");
        if(contributors[msg.sender] == 0){
            noOfContributors++;
        }
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }
    
    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }
    
    modifier onlyAdmin(){
        require (msg.sender == admin,"Only admin is allowed to send requests");
        _;
    }
    
    function createRequest(string memory _description, uint _value,address payable _recipient) public onlyAdmin{
        Request storage newRequest = requests[numRequests];
        numRequests++;
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.noOfVoters = 0;
        newRequest.isComplete = false;
    }
    
    function voteRequest(uint _requestNo) public {
        require(contributors[msg.sender]> 0, "you must be a contributor");
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.voters[msg.sender] == false,"You can only vote once");
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
        
    }
    
    function makePayment(uint _requestNo) public onlyAdmin{
        require(raisedAmount > target, " Amount is not raised");
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.isComplete == false, "this request has been completed");
        require(noOfContributors/2 < thisRequest.noOfVoters, "Half of voters are required to make payment");
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.isComplete = true;
    }
    
}