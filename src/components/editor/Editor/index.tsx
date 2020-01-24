import React, { ChangeEvent, useEffect} from 'react'
import styled from 'styled-components'
import { getDateFormat,ISOStringToJsDate, jsDateToISOString } from '../../utils';
import moment, {now} from 'moment';
import 'moment/locale/ko';
import { STORES } from '../../../constants';
import MemoStore from '../../../stores/memo/MemoStores';
import {inject, observer} from 'mobx-react'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}

function Editor (props:InjectedProps){
  
  const {setMemo, memo, updateMemo, syncTitle, syncContents} = props[STORES.MEMO_STORE]
  const initialMemo = {id:-1, title:'', createdAt:moment(now()).toISOString() , updatedAt:moment(now()).toISOString(), contents: ''};

  useEffect(()=>{
    setMemo(initialMemo)
  },[])

  const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
    const tempTitle = e.target.value
    setMemo({...memo, updatedAt:jsDateToISOString(now()), id:memo.id, title:tempTitle})
    updateMemo()
    syncTitle(tempTitle)
  }

  const handleContents = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    const tempContents = e.target.value
    setMemo({...memo,id:memo.id, updatedAt:jsDateToISOString(now()), contents:tempContents})
    updateMemo()
    syncContents(tempContents)
  }

  // const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
  //   setMemo({...memo, id:memo.id, title: e.target.value})
  //   const tempMemos = memos;
  //   memos.splice(selectedIndex,1,{...memo, title:e.target.value})
  //   setMemos(tempMemos)
  // }

  // const handleText = (e:ChangeEvent<HTMLTextAreaElement>)=>{
  //   setMemo({...memo, id:memo.id, contents:e.target.value})
  //   const tempMemos = memos;
  //   tempMemos.splice(selectedIndex,1,{...memo, contents:e.target.value})
  //   setMemos(tempMemos)
  // }

  return(
    <EditorBlock>
      <EditorBlock className='createdDate'> 
        {getDateFormat(ISOStringToJsDate(memo.updatedAt))}
      </EditorBlock>
      <EditorBlock className='inputTitle'> 
        <StyledInputTitle 
          type='text' 
          value={memo.title} 
          onChange={handleTitle} 
          placeholder='title'
        />
      </EditorBlock>
      <EditorBlock className='inputText'>
        <StyledTextarea
          value={memo.contents}
          onChange={handleContents}
          placeholder={'text'}
        />
      </EditorBlock>
    </EditorBlock>
  )
}

export default inject(STORES.MEMO_STORE)(observer(Editor))

const EditorBlock = styled.div`
  flex:1;
  display: flex;
  flex-direction:column;
    /* @media(max-width:768px){
    flex:1;
    } */
  &.createdDate{
    height: 2rem;
    flex:0;
    padding-top : 0.5rem;
    text-align : center;
    font-size: 0.8rem;
    color: darkgray;
  }
  &.inputTitle{
    /* flex: 1; */
    padding-left : 1rem;
    padding-right : 1rem;
    height:3rem;
    font-size: 1rem;
    height: 1rem;
    flex:0;
  }
  &.inputText{
    padding : 1rem;
    font-size: 1rem;
    height: 1rem;

  }
`
  const StyledInputTitle = styled.input`
    border: none;
    font-size: 1.2rem;
    font-weight: 600;
    padding:0;
    margin: 0;
    padding: 0;
    width: 100%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  `

  const StyledTextarea = styled.textarea`
    display: block;
    font-size: 1rem;
    font-weight: 400;
    font-family: Arial, Helvetica, sans-serif;
    border: 0px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: calc(100% - 60px);
    outline: none;
    resize: none;
  `
