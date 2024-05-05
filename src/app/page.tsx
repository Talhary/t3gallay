import { ThemeChange } from "components/theme";
import { db } from "~/server/db"


const colors = ['red','blue','yellow','pink'].map(el=>`bg-${el}-500`)
export const dynamic = 'force-dynamic'
export default async function  HomePage() {
 const dialogs = await db.query.dialogs.findMany();
 
console.log({dialogs})
 return <>
  <div className="relvative">
    < ThemeChange/>
  </div>
  <div className=" flex flex-row gap-2 justify-center w-[97%] mt-3 mx-auto flex-wrap ">
  {dialogs.map((el,i)=>{
    return <div key={i+1} className="max-min-sm:max-w-full  bg-white max-w-[200px]  dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-md hover:shadow-xl opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all">
  <div>
    
    {/* <div className=" bg-red-500 hidden bg-blue-500 bg-yellow-500 bg-pink-500"></div> */}
    <span className={ `inline-flex items-center justify-center p-2 rounded-md shadow-lg ${el.color}`}>
      {el.imageUrl?<></>:<svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>}
    </span>
  </div>
  <h3 className="text-slate-900 dark:text-white mt-5  text-base font-medium tracking-tight">{el.name}</h3>
  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    {el.paragraph}
  </p>
</div>
  })}

 </div>
 </>
}
