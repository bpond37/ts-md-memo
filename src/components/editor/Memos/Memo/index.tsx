import React from 'react'
import styled from 'styled-components'
import {shortenLine, removeHtml} from '../../../utils';
import moment from 'moment';

type MemoProps = {
  created: number;
  id: number;
  title :string;
  contents: string;
  selectMemo: (id:number)=>void;
  selected : boolean;
}

function Memo (props:MemoProps) {
  const {created, id, title, contents, selectMemo, selected} = props
  return(
    <MemoItem defaultChecked={selected} onClick={()=>selectMemo(id)}>
      <Item className='title' >

        {title===""?
        "새로운 메모":shortenLine(title)}
      </Item>
      <Item className='text'>
        {shortenLine(removeHtml(contents))}
      </Item>
      <Item className='createdTime'>
        {moment(created).locale('kr').fromNow()}
      </Item>
    </MemoItem>
  )

}

export default Memo

const MemoItem = styled.div`
  /* padding: 1rem; */
  flex-direction:column;
  overflow-y : auto;
  font-size: 1.2rem;
  border-bottom : 1px solid;
  border-bottom-color :lightgray;
  height: 5rem;
  background:${props => props.defaultChecked? 'lightgray' :'white'};
  font-family: Arial, Helvetica, sans-serif;
  &.title{
    font-size: 2.5rem;
    font-weight: 300;
  }
  &:hover{
    background: lightgray;
  }

`
const Item = styled.div`
  
  padding-left : 1rem;
  padding-top : 1rem;
  font-size: 1rem;
  &.title{
    font-size : 1rem;
    font-weight: bold;
  }
  &.createdTime{
    padding-top: 0;
    font-size: 0.8rem;
    color:gray;
  }
  &.text{
    padding-top : 0;
    font-size: 0.8rem;
    /* color:gray; */
  }
`