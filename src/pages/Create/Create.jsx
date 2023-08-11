import styles from "./Create.module.css"
import {  useState  } from "react"
export default function Create (){


    
    const validateTitle= (title)=>{
        if(!title){
            setError({
                ...error,
                title:"Title is required"
            })
        }
    else if(title.length<5){
        setError({
            ...error,
            title:"Title must have atleast 5 characters"
        })
    }
    else if(title.length>50){
        setError({
            ...error,
            title:"Title can have 50 characters at most"
        })

    }
    else if(typeof title!=='string'){
        setError(
            {
                ...error,
                title:"Title must be a valid string value"
            }
        )
    }
    else {
            setError({
                ...error,
                title:""
            })
    }

    }










    const [onBlurFired, setOnBlurFired] = useState(false)
    const [error,setError] = useState({
        title:"",
        content:"",
        author:"",
        description:""
    })
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

        if(onBlurFired){
            validateTitle(e.target.value)
        }
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
       validateTitle(blog.title)
        setOnBlurFired(true)
    }


    const handleDescriptionBlur=()=>{
        
    }

    const handleAuthorBlur=()=>{

    }

    const handleContentBlur= () =>{

    }


    return(
        <div className={styles.main}>

            <h1 className={styles.mainHeading}>
                CREATE BLOG POST
            </h1>
            <div className={styles.form}>
                
             

            
                <>

                <input onBlur={handleTitleBlur} value={blog.title} onChange={handleTitleChange} className={styles.title} type="text" />
                    
                    
                    {
                    error.title?(
                    <p className={styles.errormessage}>{error.title}</p>
                    ):""
                    }
                </>
                
              
               
                <input onBlur={handleAuthorBlur} value={blog.author} onChange={handleAuthorChange} className={styles.author} type="text" />
               
                <textarea onBlur={handleDescriptionBlur} value={blog.description} onChange={handleDescriptionChange} className={styles.description} name="" id="" cols="30" rows="10"></textarea>
               
                <textarea onBlur={handleContentBlur} value={blog.content} onChange={handleContentChange} className={styles.content} name="" id="" cols="30" rows="10"></textarea>
               
                <input  type="file" name="" id="" />
            
            
            
            </div>



        </div>
    )
}