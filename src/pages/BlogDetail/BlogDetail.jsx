import styles from "./BlogDetail.module.css"
import { useNavigate, useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import { deleteBlog, getById } from "../../api/internal"
import Navbar from "../../components/Navbar/Navbar"
import Loader from "../../components/Loader/Loader"
export default function BlogDetail(){
    const myArr = [
        "64da717486f85b9b4e1068ee",
        "64da736c86f85b9b4e1068f0"
        ,"64da73c586f85b9b4e1068f2"
        ,"64da744b86f85b9b4e1068f4"
        ,"64da750686f85b9b4e1068f6"
        ,"64da756b86f85b9b4e1068f8"
        ,"64da7945e5c663011f50c7c9"
    ]
    const[showDel,setShowDel]= useState(true)
    const navigate = useNavigate()
    const {id} = useParams()
    const options = {
        year:'numeric',
        month:'long',
        day:'numeric'
    }
    const [data,setData] = useState(null) 
    useEffect(() => {
        
        (async _=>{
            
            myArr.forEach((item)=>{
               return item===id?setShowDel(false):''
            })
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
            {
                showDel&&
            (<div className={styles.container}>
                <button onClick={_=>{
                navigate('/blog/'+id+'/update')
                }
                } className={styles.edit}>Edit</button>
                <button onClick={ async _=>{
                   let response;
                    try{
                  response = await deleteBlog(id)

                    }
                    catch(error){
                        console.log('error deleting the blog',error)
                    }
                    navigate('/blog')
                    console.log(response)
                }} className={styles.delete}>Delete</button>
            </div>)
            }
        </div>
    )

}