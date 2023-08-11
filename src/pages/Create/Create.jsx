import styles from "./Create.module.css";
import { useState, useEffect } from "react";
import {
    deleteBlog,
    editBlog,
    getAll,
    getById,
    createBlog
    } from "../../api/internal.js"
export default function Create() {
    
    const [onBlurFired, setOnBlurFired] = useState(false);
    const [onBlurAuthorFired, setOnBlurAuthorFired] = useState(false);
    const [onBlurDescriptionFired, setOnBlurDescriptionFired] = useState(false);
    const [onBlurContentFired, setOnBlurContentFired] = useState(false);
    const [onBlurPhotoFired, setOnBlurPhotoFired] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [photoError,setPhotoError] = useState("")
    const [error, setError] = useState({
      title: "",
      content: "",
      author: "",
      description: "",
    });
    const [blog, setBlog] = useState({
      title: "",
      content: "",
      description: "",
      author: "",
    });

const postData = async()=>{

    const formData = new FormData()
    formData.append("title",blog.title);
    formData.append("content",blog.content)
    formData.append("description",blog.description)
    formData.append("author",blog.author)
    formData.append("file",selectedFile)

 const res=  await createBlog(formData)
 console.log(res)
}
    

    
   
    

    const validateTitle = (title) => {


        !title?setError({...error,title:"Title is required"}):
        title.length<5?setError({...error,title:"Title must have atleast 5 characters"}):
        title.length>50?setError({...error,title:"Title can have 50 characters at most"}):
        typeof title !== 'string'?setError({...error,title:"Title must have to be a valid string"}):
        setError({...error,title:""})

  };

  const validateAuthor = (author) => {
    !author?setError({...error,author:"Author is required"}):
    author.length<5?setError({...error,author:"Author must have atleast 5 characters"}):
    author.length>30?setError({...error,author:"Author cam have 30 characters at most"}):
    typeof author !=='string'?setError({...error,author:"Author must have to be a valid string"}):
    setError({...error,author:""})
  };


  const validateDescription =(description)=>{
        !description?setError({...error,description:"Description is required"}):
        description.length<50?setError({...error,description:"Description must have atleast 50 characters"}):
        description.length>150?setError({...error,description:"Description must have atmost 150 characters"}):
        typeof description !== 'string'?setError({...error,description:"Description must have to be a valid string"}):
        setError({...error,description:""})
    };

const validateContent =(content)=>{
    !content?setError({...error,content:"Content is required"}):
    content.length<50?setError({...error,content:"Content must have atleast 50 characters"}):
    typeof content !== 'string' ? setError({...error,content:"Content must have to be a valid string"}):
    setError({...error,content:""})
}


const validatePhoto =(photo) =>{
    !photo?setPhotoError("Photo is required"):
    (photo.type!=='image/png')&&(photo.type!=='image/jpeg')&&(photo.type!=='image/jpg')?setPhotoError("The file must have to be a valid image"):
    photo.size>10*1024*1024?setPhotoError("The image size must not exceed 10MB"):
    setPhotoError("")
}
    


  const handleTitleChange = (e) => {
    setBlog({
      ...blog,
      title: e.target.value,
    });

    if (onBlurFired) {
      validateTitle(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => {
    setBlog({
      ...blog,
      description: e.target.value,
    });
    if(onBlurDescriptionFired){
        validateDescription(e.target.value)
    }
  };
  const handleContentChange = (e) => {
    setBlog({
      ...blog,
      content: e.target.value,
    });
if (onBlurContentFired) {
    validateContent(e.target.value)
}

  };
  const handleAuthorChange = (e) => {
    setBlog({
      ...blog,
      author: e.target.value,
    });
    if (onBlurAuthorFired) {
      validateAuthor(e.target.value);
    }
  };




const handlePhotoChange=(e)=>{
    setSelectedFile(e.target.files[0])
    console.log(e.target.files[0])

    if(onBlurPhotoFired){
        validatePhoto(e.target.files[0])
    }
}




  const handleTitleBlur = () => {
    validateTitle(blog.title);
    setOnBlurFired(true);
  };

  const handleDescriptionBlur = () => {
      validateDescription(blog.description);
      setOnBlurDescriptionFired(true);
  };

  const handleAuthorBlur = () => {
    validateAuthor(blog.author);
    setOnBlurAuthorFired(true);
  };

  const handleContentBlur = () => {
    validateContent(blog.content);
    setOnBlurContentFired(true)
  };

  const handlePhotoBlur = ()=>{
    // validatePhoto(selectedFile)
    setOnBlurPhotoFired(true)
    console.log("Photo blur fired")
  }

  return (
    <div className={styles.main}>
      <div className={styles.form}>
      <h1 className={styles.mainHeading}>CREATE BLOG POST</h1>
        <>
          <input
            onBlur={handleTitleBlur}
            value={blog.title}
            onChange={handleTitleChange}
            className={styles.title}
            type="text"
            placeholder="Enter title here"
          />

          {error.title ? (
            <p className={styles.errormessage}>{error.title}</p>
          ) : (
            <p className={styles.alter}>A</p>
          )}
        </>

        <>
          <input
            onBlur={handleAuthorBlur}
            value={blog.author}
            onChange={handleAuthorChange}
            className={styles.author}
            type="text"
            placeholder="Enter your name"
          />
          {error.author ? (
            <p className={styles.errormessage}>{error.author}</p>
          ) : (
            <p className={styles.alter}>A</p>
          )}
        </>
        <>

        <textarea
          onBlur={handleDescriptionBlur}
          value={blog.description}
          onChange={handleDescriptionChange}
          className={styles.description}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Enter description here"
        ></textarea>
        {
            error.description?(<p className={styles.errormessage}>
           {error.description} </p>):<p className={styles.alter}>A</p>
            
        }

        </>

        <>

        <textarea
          onBlur={handleContentBlur}
          value={blog.content}
          onChange={handleContentChange}
          className={styles.content}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Enter your content here"
        ></textarea>
        {
            error.content?(
                <p className={styles.errormessage}>{error.content}</p>
            ):<p className={styles.alter}>A</p>
        }
        
        </>

        <div className={styles.photoCover}>
        <label tabIndex={0} onBlur={handlePhotoBlur} className={styles.photoLabel} htmlFor="inputfile">Choose a photo</label>
        <input  className={styles.photo} type="file" onChange={handlePhotoChange} name="inputfile" id="inputfile" />
       
       {selectedFile?(

        <p className={styles.photoInfo}>{selectedFile.name}</p>
       ):<p className={styles.photoInfo}>No File Choosen</p>

       }
        </div>{
            photoError?(

        <p className={styles.errormessage}>{photoError}</p>
            ):
            <p className={styles.alter}>A</p>
        }
      <button disabled={error.author||error.content||error.description
      ||error.title||photoError||!blog.title||!blog.author
      ||!blog.content||!blog.description||!selectedFile} className={styles.submit} onClick={postData}>Submit Blog</button>
      </div>

    </div>
  );
}
