import styles from "./Create.module.css"
import {  useState  } from "react"
export default function Create (){


    const [blog,setBlog] = useState({
        title:'',
        content:'',
        description:'',
        author:''
    })

    const handleTitleChange = (e) => {
            setBlog({
                ...blog,
                title:e.target.value
            })
    }
    const handleDescriptionChange = (e) => {
            setBlog({
                ...blog,
                description:e.target.value
            })
    }
    const handleContentChange = (e) => {
            setBlog({
                ...blog,
                content:e.target.value
            })
    }
    const handleAuthorChange = (e) => {
            setBlog({
                ...blog,
                author:e.target.value
            })
    }

    const handleTitleBlur =()=>{
        
    }


    const handleTitleFocus=()=>{
        
    }


    return(
        <div className={styles.main}>

            <h1 className={styles.mainHeading}>
                CREATE BLOG POST
            </h1>
            <div className={styles.form}>
                
               {
                <input onBlur={handleTitleBlur} onFocus={handleTitleFocus} value={blog.title} onChange={handleTitleChange} className={styles.title} type="text" />

               }
               
                <input onBlur={} onFocus={} value={blog.author} onChange={handleAuthorChange} className={styles.author} type="text" />
               
                <textarea onBlur={} onFocus={} value={blog.description} onChange={handleDescriptionChange} className={styles.description} name="" id="" cols="30" rows="10"></textarea>
               
                <textarea onBlur={} onFocus={} value={blog.content} onChange={handleContentChange} className={styles.content} name="" id="" cols="30" rows="10"></textarea>
               
                <input  type="file" name="" id="" />
            
            
            
            </div>



        </div>
    )
}