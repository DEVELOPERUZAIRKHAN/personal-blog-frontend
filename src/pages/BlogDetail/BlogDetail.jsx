import styles from "./BlogDetail.module.css"
import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import { getById } from "../../api/internal"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import Loader from "../../components/Loader/Loader"
export default function BlogDetail(){
    const {id} = useParams()
    const options = {
        year:'numeric',
        month:'long',
        day:'numeric'
    }
    const [data,setData] = useState(null) 
    useEffect(() => {
        
      (async _=>{

       const response = await getById(id)
           console.log(response)
           setData(response.data.blog)
        }
      )()

      return () => {
      }
    }, [])
    if (!data){
        return (<>

            <Navbar/>
                <div className={styles.loadingContainer}>
<Loader/>
                </div>
        </>
        )
    }
     return  (
          <div className={styles.main}>
    <Navbar/>

            <header className={styles.header}>
            <div className={styles.container}>

                <h1 className={styles.mainHeading}>{data.title}</h1>
                <p className={styles.author}>Written by {data.author} on { new Date(data.createdAt).toLocaleDateString('en-US',options)}</p>
                <p className={styles.description}>
                {data.description}
                </p>
            </div>
            </header>
            <div className={styles.container}>

            <div className={styles.photoCover}>
                <img className={styles.photo} src={data.photo} alt="" />
            </div>
          
            </div>
            <div className={styles.container}>
                <p className={styles.content}>
                    {
                        data.content
                    }
                </p>
            </div>
        </div>
    )

}