import { action, observable } from 'mobx';
// import ProductService, { CarFilterDto, ProductDto, ProductRegistrationDto,} from '~services/ProductService';
import autobind from 'autobind-decorator';
// import { stringify } from 'querystring';

type MemoDTO = {
  id : number;
  created : Date
  contents : string
}

@autobind
class MemoStore{
  @observable memos:MemoDTO[] = []
  @observable memo:MemoDTO = {} as MemoDTO

  @action
  registerMemo(memo:MemoDTO){
    // const tempMemos = 
    this.setMemos([...this.memos, memo])
    // localStorage.setItem(`${memo.id}`,stringify(memo))
    // window.sessionStorage.setItem()
  }

  @action
  getMemos(){

    // localStorage.getItem
    // window.sessionStorage.getItem('1')
  }

  @action
  setMemos(memos:MemoDTO[]){
    this.memos = memos;
  }

  // @action
  // getMemo(){}
  // async getProduct(id: string) {
  //   const response = await this.productService.getById(id);
  //   console.log(response.data.data)
  //   this.setDetailProduct(response.data.data);
  // }
}

export default MemoStore