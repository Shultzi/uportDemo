const crypto = require('crypto');


import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Connect, SimpleSigner } from 'uport-connect';
import './main.html';

const uport = new Connect('HELP', {
      clientId: '2p21m53gpdXkd6cVdvfQURPLvYj8QX61pbz',
      network: 'rinkeby',
      signer: SimpleSigner('83445f332100d355d5d6edbe350d6479d9f0a016f6cd9e83003f71ae279f1b2c')
    })
const uportWeb3 = uport.getWeb3();

ABI = [{"constant":false,"inputs":[],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"counter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

ADDRESS = "0x38c711Fdd2Ad59c05616fB57538c34D93e36F926";

myContract = uportWeb3.eth.contract(ABI).at(ADDRESS);

uport.requestCredentials({
    //requested: ['name', 'avatar', 'phone', 'country'],
    notifications: true
  },
  (uri) => {
      Session.set({"uri": uri});      
  })
  .then((credentials) => {

    console.log(credentials);

	console.log(myContract);
    myContract._eth.getAccounts((err, res)=> {console.log(err, res)});
    myContract.vote((err,res)=>{console.log(err,res)});
  });

Template.hello.helpers({
  uriText() {
    return Session.get("uri");
  }
});


// contract Test{ <--- That's the test smart contract I'm using
    
//     mapping (address=>uint) public counter;
    
//     function vote(){
//         counter[msg.sender] = counter[msg.sender] + 1;
//     }
// }
