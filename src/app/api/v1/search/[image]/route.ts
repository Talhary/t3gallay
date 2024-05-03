import { NextApiRequest } from "next";
import axios from 'axios'
import { NextRequest, NextResponse } from "next/server";
import gis from "async-g-i-s";

const getImages = async (text:string)=>{
    const {data} =await axios.get('https://api.serply.io/v1/image/q='+text.split(' ').join('+'), {
    headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.SERAPI_KEY,
    'X-Proxy-Location': '',
    'X-User-Agent': ''
       }
     })
     return data
}
export const GET = async(req:NextRequest,{params}:{params:any})=>{
   const  url = new URL(req?.url as string)
   const imageSearch = new URLSearchParams(url.searchParams).get('image')
   if(!imageSearch){
    return NextResponse.json({
        status:'400',
        message:'Please provide image param'
    })
   }
    const results = await getImages(imageSearch);
    if(!results.image_results){
        return NextResponse.json({
        status:'404',
        message:'Not found any thing'
    })
    }
    return NextResponse.json({
        status:'200',
        message:{res:results.image_results.map((el:any,i:number)=>{
            return {url:el.image.src,title:el.link.title,id:(i+1) }
        }),search:imageSearch}
    })
}