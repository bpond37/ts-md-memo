import 'moment/locale/ko';

export const getDateFormat = (time:number)=>{
  const date = new Date(time);
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const ampm = date.getHours() <12 ? "오전":"오후"
  const hours = date.getHours() % 12
  const minutes = date.getMinutes()<10? "0"+date.getMinutes(): date.getMinutes();
  //for test
  const seconds = date.getSeconds()<10? "0"+date.getSeconds(): date.getSeconds();
  return year+"년 "+month+"월 "+ day+"일 " +ampm +" "+ hours+":"+minutes +" "+seconds; 
}

