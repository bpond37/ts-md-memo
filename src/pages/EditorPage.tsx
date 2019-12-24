import React from 'react'
import {inject, observer} from 'mobx-react'
import EditorTemplate from '../components/editor/EditorTemplate'
import TopBar from '../components/TopBar'
import Editor from '../components/editor/Editor'
import MemoStore from '../stores/memo/MemoStores'
import { STORES } from '../constants'
import Memos from '../components/editor/Memos'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}
function EditorPage (props:InjectedProps){
  return(
    <EditorTemplate
      header={<TopBar {...props}/>}
      editor={<Editor {...props}/>}
      preview={<Memos {...props}/>}
      />
  )
}

export default inject(STORES.MEMO_STORE)(observer(EditorPage))