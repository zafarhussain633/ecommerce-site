import { apiUrl } from "src/config";
import { useEffect, useState } from "react"
import axios from "axios"


export default function useFetchSignup(email:string,password:string){

    const [data,setData] = useState(null)
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const {data} = await axios.post(`${apiUrl}` ,{
                        userName: email,
                        password:password,
                    } )
                    setData(data)
                }catch(err){
                    setError("err")
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [email,password])

    return { data, error, loading }

}