import axios from 'axios'
import {ApiResponse} from './types'
import AuthStore from '../stores/auth/AuthStore'

export type MemoRegistrationDTO ={
  id?: number;
  userId? :number;
  title: string;
  contents: string; 
}

export type MemoUpdateDTO ={
  id: number;
  userId? :number;
  title: string;
  contents: string; 
}

export type MemoDTO = {
  id : number;
  title : string
  userId?: number;
  contents : string
  createdAt : string;
  updatedAt : string;
}

const API_HOST = process.env.baseURL || 'http://localhost:4000/api';

class memoService {

  constructor(private authStore: AuthStore) {
  }

  async getMemoList(): Promise<ApiResponse<MemoDTO[]>> {
    if (this.authStore.auth == null) {
      throw new Error('need to login!');
    }
   const userId = this.authStore.auth.id
    return axios.get(`${API_HOST}/memos/${userId}`);
  }

  async registerMemo(body: MemoRegistrationDTO):Promise<ApiResponse<MemoDTO>>{
    if (this.authStore.auth == null) {
      throw new Error('need to login!');
    }
    
    const formData = new FormData();
    formData.append('userId', String(this.authStore.auth.id));
    formData.append('title', body.title);
    formData.append('contents', body.contents);

    return axios.post<MemoRegistrationDTO, ApiResponse<MemoDTO>>(`${API_HOST}/memos`, formData, {
      headers: {'Content-Type': 'multipart/form-data' }
    })
  }

  async updateMemo(body: MemoUpdateDTO):Promise<ApiResponse<MemoDTO>>{
    if (this.authStore.auth == null) {
      throw new Error('need to login!');
    }
    const req = {title:body.title, contents:body.contents}

    return axios.patch<MemoUpdateDTO, ApiResponse<MemoDTO>>(`${API_HOST}/memos/${body.id}`,req)
  }

  async deleteMemo(id:number):Promise<ApiResponse<MemoDTO>> {
    return axios.delete(`${API_HOST}/memos/${id}`)
  }
}

export default memoService;