import React,{useState} from 'react'
import styled from 'styled-components'
import TopBar from '../TopBar'

const StyledDiv = styled.div`
  &.panes{
    height : calc(100vh - 3rem);
    display : flex;
    background : $oc-gray-1;
  }
  &.pane{
    display:flex;
    flex:1;
  }
  &.seperator{
    width:1rem;
    height:100%;
    position:absolute;
    transform : translate(-50%);
    cursor: col-resize;
  }
`

export default function EditorTemplate ({header, editor, preview}:any){

  const [leftPercentage, setLeftPercentage] = useState(0.3)

  const handleMouseMove = (e:any) =>{
    setLeftPercentage(e.clientX/window.innerWidth)
  }
  const leftStyle = {
    flex: leftPercentage
  }
  const rightStyle = {
    flex: 1-leftPercentage
  }
  const separatorStyle ={
    left: `${leftPercentage*100}%`
  }
  const handleMouseUp = (e:any)=>{
    document.body.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleSeparatorMousdeDown = (e:any) =>{
    document.body.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp)
  }

  return(
    <StyledDiv>
      {<TopBar/>}
      <StyledDiv className='panes'>
        <StyledDiv className='pane editor' style={leftStyle}>
          {preview}
        </StyledDiv>
        <StyledDiv className='pane preview' style={rightStyle}>
          {editor}
        </StyledDiv>
        <StyledDiv 
          className='seperator'
          style={separatorStyle}
          onMouseDown={handleSeparatorMousdeDown}
        >
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
}