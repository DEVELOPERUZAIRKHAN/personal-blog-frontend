import styles from "./Create.module.css";
import { useState } from "react";
export default function Create() {
    const [onBlurFired, setOnBlurFired] = useState(false);
    const [onBlurAuthorFired, setOnBlurAuthorFired] = useState(false);
    const [onBlurDescriptionFired, setOnBlurDescriptionFired] = useState(false);
    const [onBlurContentFired, setOnBlurContentFired] = useState(false);
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

  return (
    <div className={styles.main}>
      <h1 className={styles.mainHeading}>CREATE BLOG POST</h1>
      <div className={styles.form}>
        <>
          <input
            onBlur={handleTitleBlur}
            value={blog.title}
            onChange={handleTitleChange}
            className={styles.title}
            type="text"
          />

          {error.title ? (
            <p className={styles.errormessage}>{error.title}</p>
          ) : (
            ""
          )}
        </>

        <>
          <input
            onBlur={handleAuthorBlur}
            value={blog.author}
            onChange={handleAuthorChange}
            className={styles.author}
            type="text"
          />
          {error.author ? (
            <p className={styles.errormessage}>{error.author}</p>
          ) : (
            ""
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
        ></textarea>
        {
            error.description?(<p className={styles.errormessage}>
           {error.description} </p>):""
            
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
        ></textarea>
        {
            error.content?(
                <p className={styles.errormessage}>{error.content}</p>
            ):""
        }
        
        </>

        <div className={styles.photoCover}>
        <button className={styles.photoButton}>Choose Photo</button>
        <p className={styles.photoInfo}></p>
        <input className={styles.photo} type="file" name="" id="" />
        </div>
      </div>
    </div>
  );
}
