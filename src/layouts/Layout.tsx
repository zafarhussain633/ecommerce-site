import React, {FC, useEffect} from 'react'
import Navbar from "src/components/navbar"
import {getUser} from "src/utils/storage"
import {useRouter} from "next/router"
interface Props {
}

const Layout:FC<Props> = ({children, ...props}):any => {

  const router = useRouter();
  useEffect(()=>{
  const checkLogin = getUser();
  if(checkLogin===false){
    router.push("/")
  }
  },[])

  return (
      <> 
        <Navbar />
        <div {...props}>{children}</div>
      </>
  )
}

export default Layout