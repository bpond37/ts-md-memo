import React, {useState} from 'react'
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
  const {registerMemo} = props[STORES.MEMO_STORE]
  // const initialTime = getDate(now())

  const [text, setText] = useState({editorHtml:''})
  const [createdTime, setCreatedTime] = useState(now())
  
  const handleChange = (html:any) =>{
    console.log(html)
    setText({ editorHtml: html });

    setCreatedTime(now())

  }

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
      <QuillWrapper>
       <ReactQuill 
          theme='bubble'
          onChange={handleChange}
          value={text.editorHtml}
          modules={modules}
          // placeholder='내용을 작성하세요'
         />
      </QuillWrapper>
    </EditorDiv>
  )
}

const EditorDiv = styled.div`
  flex:1;
  display: flex;
  flex-direction:column;
  &.createdDate{
    height: 2rem;
    flex:0;
    padding-top : 0.5rem;
    text-align : center;
    font-size: 0.8rem;
    color: darkgray;
  }
  &.codeEditor{
    flex:1;
    /* background: gray; */
  }
`

const QuillWrapper = styled.div`
  .ql-editor{
    flex:1;
    padding: 0;
    /* height : calc(100vh - 5rem); */
    min-height: 18em;
    font-size: 1 rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before{
  left: 0px;
  }
`

export default inject(STORES.MEMO_STORE)(observer(Editor))