// 'use client'

import { Providers } from "../providers"


const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (

     <Providers >
    <div >{children}</div>
</Providers>  
  
  )
}
export default RootLayout