import React from 'react'
import styled from 'styled-components'
import pen from '../../Icons/pen.svg';
import trashcan from '../../Icons/trashcan.svg';
import MemoStore from '../../stores/memo/MemoStores';
import { STORES } from '../../constants';
import { inject, observer } from 'mobx-react'
import { now } from 'moment';

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}

function TopBar (props : InjectedProps){
  const {newMemo, setIndex, deleteMemo} = props[STORES.MEMO_STORE]
  const createMemo = () => {

    newMemo()
    setIndex()
  }

  const discardMemo = () =>{
    deleteMemo()
  }

  return(
    <TopBarBlock>
      <h4>Ulendo</h4>
      <Button onClick={createMemo}>
        <img src={pen} width={13} height={'auto'} alt={'new memo'} />
      </Button>
      <Button onClick={discardMemo}>
        <img src={trashcan} width={13} height={'auto'} alt={'remove memo'} />
      </Button>
    </TopBarBlock>
  )
}

export default inject(STORES.MEMO_STORE)(observer(TopBar))


const TopBarBlock = styled.div`
  display : flex;
  padding-left : 1rem;
  background : whitesmoke;
  height : 3rem;
  border-bottom : 0.3px solid;
  /* justify-content : center; */
  border-bottom-color :lightgray;
  align-items: center;
  font-family:Arial, Helvetica, sans-serif;
  `

const Button = styled.div`
  background: white;
  border-radius : 4px;
  margin-left : 10px;
  padding-top : 2px;
  width : 40px;
  height : 20px;
  border : 0.5px solid lightgray;
  font-size : 10;
  /* align-items: center; */
  justify-content: center;
  vertical-align: middle;
  text-align : center;
  &:hover{
    background: whitesmoke;
  }
`
