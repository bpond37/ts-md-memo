import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import MemoService,{MemoDTO} from '../../services/MemoService'

@autobind
class MemoStore{
  @observable memos:MemoDTO[] = []
  @observable memo:MemoDTO = {} as MemoDTO
  @observable id:number = 1
  @observable selectedId:number = 0;
  @observable selectedIndex:number = 0;

  constructor(private memoService:MemoService){
  }

  @action
  async getMemoList(){
    console.log("getMemoList")
    const response = await this.memoService.getList()
    console.log(response)
    const list = response.data.data

    if(response.data.data.length>0){
      const lastId = list[list.length-1].id
      this.setSelectedId(lastId)
      this.id = lastId
      console.log(lastId)
      this.getMemo(lastId)
      this.setMemo(this.memo)
    }
    this.setMemos(list)

    //최근 수정된 녀석으로 선택하는 함수 필요
  }

  @action
  async newMemo(){
    console.log("newMemo")
    try {
      const response = await this.memoService.registerMemo({title:'', contents:''})
      this.selectedId=response.data.data.id
      this.getMemoList()
      this.getMemo(this.selectedId)
      
    } catch (e) {
      console.log(e.response.data.msg)
      alert(e.response.data.msg);
      return e.response.status;
    }
    // this.id ++;
    // const tempMemo = {id:this.id, createdAt:now(), contents:'',title:''}
    // this.selectedId= this.id;
    // this.setMemo(tempMemo)
    // this.setMemos([...this.memos, tempMemo])

  }

  @action
  async deleteMemo(id:number){
    console.log('deletememo')
    try {
      const response = await this.memoService.deleteMemo(id)
      console.log(response)
      await this.getMemoList();
    } catch (e) {
      console.log(e.response.status)
      return e.response.status;
    }
    this.getRecentMemo()
    // const tempMemos = this.memos
    // tempMemos.splice(this.selectedIndex,1)
    // this.setMemos(tempMemos)
    // this.setMemo(tempMemos[this.selectedIndex-1])
  }

  //업데이트 시간..
  @action
  async updateMemo(){
    console.log("updatememo")
    // this.setMemo({...this.memo, title:title})
    const response = await this.memoService.updateMemo(this.memo)
    console.log(response)
    
  }

  @action
  getRecentMemo(){
    const tempMemos = this.memos
    if(tempMemos.length>0){
      const lastId = tempMemos[tempMemos.length-1].id
      this.setSelectedId(lastId)
      this.id = lastId
      console.log(lastId)
      this.getMemo(lastId)
      this.setMemo(this.memo)
    }
  }

  @action
  setMemos(memos:MemoDTO[]){
    console.log("setMemos")
    this.memos = memos;
  }

  @action
  getMemo(id:number){
    console.log("getmemo",id)
    this.setSelectedId(id)
    const tempMemo = this.memos.find((item)=>item.id === id)
    if(tempMemo===undefined){
      return null;
    }
    this.setMemo(tempMemo)
  }


  @action
  syncTitle(title:string){
    console.log("title?content?",title)
    const tempMemos = this.memos
    tempMemos.splice(this.selectedIndex,1,{...this.memo, title:title})
    this.setMemos(this.memos)
  }

  @action
  syncContents(contents:string){
    const tempMemos = this.memos
    tempMemos.splice(this.selectedIndex,1,{...this.memo, contents:contents})
    this.setMemos(this.memos)

  }
  // @action
  // editMemo(){
  //   const tempMemos = this.memos;
  //   const index =  this.memos.indexOf(this.memo)
  //   tempMemos.splice(index,1,this.memo)
  //   this.setMemos(tempMemos)
  //   console.log("editmemo")
  //   console.log(this.memos[index])
  // }

  @action
  setMemo(memo:MemoDTO){
    console.log("setMemo")
    console.log(memo)
    this.memo = memo
    this.setIndex()

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