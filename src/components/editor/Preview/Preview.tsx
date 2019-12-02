import React from 'react'
import styled from 'styled-components'

const Preview = styled.div`
  flex:1;
  padding: 2rem;
  overflow-y : auto;
  font-size: 1.2rem;
  @media(max-width:768px){
    display:none;
  }
  &.title{
    font-size: 2.5rem;
    font-weight: 300;
    padding-bottom: 2rem;
    border-bottom : 1px solid;
  }
`

function PreviewPane (){

  return(
    <Preview>
      <Preview className='title'>
        제목
      </Preview>
      <div>
        내용
      </div>
    </Preview>
  )

}

export default PreviewPane;