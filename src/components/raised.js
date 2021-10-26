import React, { Component } from 'react'
import styled from "styled-components";


const Input = styled.input`
   margin-left:5%;
   width: 70%;
   border-radius: 30px;
   margin-bottom: 20px;
   padding: 20px;`

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

export default class Raised extends Component {
    render() {
        return (
            <div>
                <h2 style={{paddingLeft: "6%"}}>Total Money Raised: {this.props.raisedAmount}</h2><br></br>
                <Input></Input><br></br>
                <Button>Donate</Button>
            </div>
        )
    }
}
