import React from 'react'
import styled from 'styled-components'
import pen from '../../Icons/pen.svg';
import trashcan from '../../Icons/trashcan.svg';

const Bar = styled.div`
  display : flex;
  padding-left : 1rem;
  background : whitesmoke;
  height : 3rem;
  border-bottom : 0.3px solid;
  /* justify-content : center; */
  /* border-bottom-color :gray; */
  align-items: center;
  `

const Button = styled.div`
  background: white;
  border-radius : 4px;
  margin-left : 10px;
  padding-top : 2px;
  width : 40px;
  height : 20px;
  border : 0.5px solid gray;
  font-size : 10;
  /* align-items: center; */
  justify-content: center;
  vertical-align: middle;
  text-align : center;
  &:hover{
    background: whitesmoke;
  }
`


function TopBar (){
  return(
    <Bar>
      <h5>MD Note(가제)</h5>
      <Button>
        <img src={pen} width={13} height={'auto'} alt={'new memo'} />
      </Button>
      <Button>
        <img src={trashcan} width={13} height={'auto'} alt={'remove memo'} />
      </Button>
    </Bar>
  )
}

export default TopBar