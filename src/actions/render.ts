'use Server'
import axios from "axios"
const Render = async (text:string)=>{
    const {data} = await axios.get('http://localhost:3000/api/v1/search/image?image='+text.split(' ').join('+'))
    return data
 }
export default Render