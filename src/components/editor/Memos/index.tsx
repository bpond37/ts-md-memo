import React from 'react'
import styled from 'styled-components'
import { STORES } from '../../../constants';
import MemoStore from '../../../stores/memo/MemoStores';
import {inject, observer} from 'mobx-react'
import Memo from './Memo'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}

function Memos (props:InjectedProps){
  
  const {memos, getMemo, setSelectedId,selectedId, setIndex} = props[STORES.MEMO_STORE]

  const selectMemo = (id:number) => {
    getMemo(id)
    setSelectedId(id)
    setIndex()
  }

  return(
    <MemosBlock>
      {memos.slice(0).sort((a,b) => b.created - a.created).map((v)=>
        <Memo 
          key={v.created}
          created={v.created}
          id={v.id}
          contents={v.contents}
          title={v.title}
          selectMemo={()=>selectMemo(v.id)}
          selected={selectedId ===v.id }
          />
      )}
    </MemosBlock>
  )
}

export default inject(STORES.MEMO_STORE)(observer(Memos))

const MemosBlock = styled.div`
  display:flex; 
  flex-direction:column;
  flex:1;
  
`