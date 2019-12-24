import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import { now } from 'moment';

type MemoDTO = {
  id : number;
  created : number;
  contents : string
  title : string
}

@autobind
class MemoStore{
  @observable memos:MemoDTO[] = []
  @observable memo:MemoDTO = {} as MemoDTO
  @observable id:number = 1;
  @observable selectedId:number = 0;
  @observable selectedIndex:number = 0;

  @action
  setMemos(memos:MemoDTO[]){
    console.log("setMemos")
    this.memos = memos;
  }

  @action
  getMemo(id:number){
    const tempMemo = this.memos.find((item)=>item.id === id)
    if(tempMemo===undefined){
      return null;
    }
    this.setMemo(tempMemo)
  }

  @action
  editMemo(){
    const tempMemos = this.memos;
    const index =  this.memos.indexOf(this.memo)
    tempMemos.splice(index,1,this.memo)
    this.setMemos(tempMemos)
    console.log("editmemo")
    console.log(this.memos[index])

  }

  @action
  setMemo(memo:MemoDTO){
    console.log("setMemo")
    console.log(memo)
    this.memo = {...memo, created:now()}
  }

  @action
  newMemo(){
    console.log("newMemo")
    this.id ++;
    const tempMemo = {id:this.id, created:now(), contents:'',title:''}
    this.selectedId= this.id;
    this.setMemo(tempMemo)
    this.setMemos([...this.memos, tempMemo])

  }

  @action
  deleteMemo(){
    const tempMemos = this.memos
    tempMemos.splice(this.selectedIndex,1)
    this.setMemos(tempMemos)
    this.setMemo(tempMemos[this.selectedIndex-1])
  }

  @action
  setSelectedId(id:number){
    this.selectedId = id;
  }

  @action
  setIndex(){
    const tempMemo = this.memos.find((item)=>item.id === this.selectedId)
    if(tempMemo===undefined){
      return null;
    }
    const index = this.memos.indexOf(tempMemo)
    this.selectedIndex = index

    console.log("current index",index)
  }

}

export default MemoStore