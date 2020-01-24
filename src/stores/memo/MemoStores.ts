import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import MemoService,{ MemoDTO } from '../../services/MemoService'
import { ISOStringToJsDate } from '../../components/utils';

@autobind
class MemoStore{
  @observable memos:MemoDTO[] = []
  @observable memo:MemoDTO = {} as MemoDTO
  @observable selectedId:number = 0;
  @observable selectedIndex:number = 0;

  constructor(private memoService:MemoService){
  }

  @action
  async getMemoList(){
    console.log("getMemoList")
    const response = await this.memoService.getMemoList()
    const list = response.data.data
    this.setMemos(list)
    this.getRecentUpdatedMemo()
  }

  @action
  async newMemo(){
    console.log("newMemo")
    const response = await this.memoService.registerMemo({title:'', contents:''})
    console.log(response.data.msg)
    await this.getMemoList()
    this.selectedId = response.data.data.id
    this.getMemoById(this.selectedId)

  }

  @action
  async deleteMemo(id:number){
    console.log('deletememo')
    await this.memoService.deleteMemo(id)
    await this.getMemoList();
    this.getRecentUpdatedMemo()
  }

  @action
  async updateMemo(){
    console.log("updatememo")
    await this.memoService.updateMemo(this.memo)
  }

  //최신 메모 선택하는 함수
  @action
  getRecentUpdatedMemo(){
    const tempMemos = this.memos
    if(tempMemos.length>0){
      const lastId = tempMemos.sort((a,b)=> ISOStringToJsDate(b.updatedAt)-ISOStringToJsDate(a.updatedAt))[0].id
      this.getMemoById(lastId)
    }
  }

  // id 로 메모를 불러오는 함수
  @action
  getMemoById(id:number){
    console.log("getmemo")
    this.selectedId = id;
    const tempMemo = this.memos.find((item)=>item.id === id)
    if(tempMemo){
      this.setMemo(tempMemo)
    }
  }

  @action
  setMemo(memo:MemoDTO){
    console.log("setMemo")
    console.log(memo)
    this.memo = memo
    this.setIndex()
  }

  @action
  setMemos(memos:MemoDTO[]){
    console.log("setMemos")
    this.memos = memos;
  }

  @action
  setIndex(){
    const tempMemo = this.memos.find((item)=>item.id === this.selectedId)
    if(tempMemo){
      const index = this.memos.indexOf(tempMemo)
      this.selectedIndex = index
      console.log("current index",index)
    }
  }

  @action
  syncTitle(title:string){
    this.memos.splice(this.selectedIndex,1,{...this.memo, title:title})
  }

  @action
  syncContents(contents:string){
    this.memos.splice(this.selectedIndex,1,{...this.memo, contents:contents})
  }
}

export default MemoStore