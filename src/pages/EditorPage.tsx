import React from 'react'
import {inject, observer} from 'mobx-react'
import EditorTemplate from '../components/editor/EditorTemplate'
import TopBar from '../components/TopBar'
import Preview from '../components/editor/Preview/Preview'
import Editor from '../components/editor/Editor'
import MemoStore from '../stores/memo/MemoStores'
import { STORES } from '../constants'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}

export default function EditorPage (props:InjectedProps){
  return(
    <EditorTemplate
      header={<TopBar/>}
      editor={<Editor {...props}/>}
      preview={<Preview/>}
      />
  )
}

// export default inject(STORES.MEMO_STORE)(observer(EditorPage))