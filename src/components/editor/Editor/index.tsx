import React, {useState, ChangeEvent, useEffect} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styled from 'styled-components'
import { getDateFormat } from '../../utils';
import { now } from 'moment';
import 'moment/locale/ko';
import { STORES } from '../../../constants';
import MemoStore from '../../../stores/memo/MemoStores';
import {inject, observer} from 'mobx-react'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}

function Editor (props:InjectedProps){
  const {registerMemo, setMemo, memo} = props[STORES.MEMO_STORE]
  // const initialTime = getDate(now())
  // const [title, setTitle] = useState('')
  // const [text, setText] = useState({editorHtml:''})
  const [createdTime, setCreatedTime] = useState(now())
  
  //temporory id
  let id = 1;

  useEffect(()=>{
    console.log('useeffect')
    handleChange('')
    // setMemo({id:id, title:'', created:createdTime, contents: ''})
  },[])

  // const initializeEditor = ()=>{
  //   setText({editorHtml:''})
  //   setTitle('')
  //   setCreatedTime(now())
  // }

  const handleChange = (html:string) =>{
    // setText({ editorHtml: html });
    console.log("handlechange")
    setMemo({...memo, contents:html})
    setCreatedTime(now())
  }

  const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
    // setTitle(e.target.value)
    const tempTitle = e.target.value
    console.log(tempTitle)
    setMemo({...memo, title: tempTitle})
    setCreatedTime(now())

  }
  // registerMemo({id:id++, created:createdTime, contents: text.editorHtml})

  const modules = {
    toolbar:[
      [{header:'1'},{header:'2'}],
      ['bold', 'italic', 'underline','strike'],
      [{list:'ordered'}, {list:'bullet'}],
      ['blockquote', 'code-block', 'link', 'image']
    ],
  }

  return(
    <EditorDiv>
      <EditorDiv className='createdDate'> {getDateFormat(createdTime)}</EditorDiv>
      <EditorDiv className='inputTitle'> 
      <input type='text' value={memo.title} onChange={e=>handleTitle(e)} placeholder='Title'
       style={{border:'none', fontSize:'1.2rem' }}
       >
      </input>
      </EditorDiv>
      <QuillWrapper>
       <ReactQuill 
          theme='bubble'
          onChange={handleChange}
          value={memo.contents}
          modules={modules}
          // placeholder='내용을 작성하세요'
         />
      </QuillWrapper>
    </EditorDiv>
  )
}

export default inject(STORES.MEMO_STORE)(observer(Editor))

const EditorDiv = styled.div`
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
    font-size: 1rem;
    height: 1rem;
    flex:0;
  }
`

const QuillWrapper = styled.div`
    padding-top: 1rem;
  .ql-editor{
    flex:1;
    /* height : calc(100vh - 5rem); */
    padding : 0;
    padding-left : 1rem;
    min-height: 18em;
    font-size: 1rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before{
  left: 0px;
  }
`