import React, { Component } from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 0.5;
  padding: 40px;
  margin : 20px;
  border-radius: 50px;
  border: 1px;
  border-color: black;
  border-style: solid;
`
const Container = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
`

const Button = styled.button`
  width: 200px;
  margin-left: 5%;
  align-items: center;
  background: transparent;
  border-radius: 30px;
  border: 2px solid black;
  color: black;
  height: 40px;
  padding: 0.25em 1em;
`;

const StyledTextarea = styled.textarea`
   margin-left:5%;
   width: 70%;
   border-radius: 30px;
   margin-bottom: 20px;
   padding: 20px;
`;

const Title = styled.p`
  color: #000000;
  font-weight: 150;
  font-family: Georgia, 'Times New Roman', Times, serif;
`

const Description = styled.p`
  color: #000000;
  font-weight: 300;
  font-size: medium;
`

const Input = styled.input`
   margin-left:5%;
   width: 70%;
   border-radius: 30px;
   margin-bottom: 20px;
   padding: 20px;`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 8px 14px;
  background: #1DA1F2;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #fff;
  outline: 0;
  font-weight: 300;
  :hover {
    opacity: 0.8;
  }`

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* <p1>{this.props.noOfContributors}</p1> */}
                <form onSubmit={(event) => {
                      event.preventDefault()
                      const description = this.description.value
                      const value = this.value.value
                      const address = this.recipientAddress.value
                      console.log(description)
                       console.log(value)
                        console.log(address)
                      this.props.createRequest(description,value,address)
                    }}>
                    <Container>    
                     <Input
                     id="postContent"
                     type="text"
                     ref={(input) => { this.value = input }}
                     placeholder = "Amount to raise.."
                     className="form-control">
                     </Input>
                     <Input
                      id="postContent"
                      type="text"
                      ref={(input) => { this.recipientAddress = input }}
                      placeholder = "Recipient's public ethereum address"
                      className="form-control"
                      >          
                     </Input>
                     <StyledTextarea 
                    id="postContent"
                    type="text"
                    placeholder = "description..."
                    ref={(input) => { this.description = input }}
                    className="form-control"
                     />
                    <Button type="submit" >Create Request</Button>
                   </Container> 
                   </form>
            </div>
        )
    }
}
