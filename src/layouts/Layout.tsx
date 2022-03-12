import React, {FC} from 'react'
import Navbar from "src/components/navbar"

interface Props {
}

const Layout:FC<Props> = ({children, ...props}):any => {

 
  return (
      <> 
        <Navbar />
        <div {...props}>{children}</div>
      </>
  )
}

export default Layout