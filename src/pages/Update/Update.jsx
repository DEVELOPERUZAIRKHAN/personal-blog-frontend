import styles from "./Update.module.css";
import { useState, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { createBlog } from "../../api/internal.js";
import { resizePhoto } from "./resizer";
import { BiSolidCheckCircle } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
export default function Update() {
  /*********THE STATES**********/
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [blurFlag, setBlurFlag] = useState({
    author: false,
    description: false,
    title: false,
    content: false,
    photo: false,
  });
  const [error, setError] = useState({
    title: "",
    content: "",
    author: "",
    description: "",
    photo:""
  });
  
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    description: "",
    author: "",
  });
  
  /*********THE STATES**********/


  const postData = async () => {
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("description", blog.description);
    formData.append("author", blog.author);
    formData.append("file", selectedFile);
let response;
try{
   response = await createBlog(formData);
  setSubmitting(false);
  console.log(response);
  if (response.status === 201) {
    setSubmitted(true);
  }

}
catch(error){
  console.log('error submitting blog',error)
}
finally{
  if (fileInputRef.current) {
    fileInputRef.current.value = null;
  }
  setBlog({
    title: "",
    content: "",
    description: "",
    author: "",
  });
  
  setError({
    title: "",
    content: "",
    description: "",
    author: "",
    photo:""
  });
  setBlurFlag({
    author: false,
    title: false,
    content: false,
    description: false,
    photo: false,
  });
  setSelectedFile(null);

}

  };

  const validateTitle = (title) => {
console.log( 'title validating')
if(!title){
  setError((prevError)=>({...prevError,title:'Title is required '}))
      return false;
    }
    else if(title.length<5){
      setError((prevError)=>({...prevError,title:"Title must have atleast 5 characters"}))
      return false
    }
    else if(title.length>80){
      setError((prevError)=>({...prevError,title:'Title must not exceed 80 characters'}))
      return false
    }
    else if(typeof title!=='string'){
      setError((prevError)=>({...prevError,title:"Title must have to be a valid string"}))
      return false
    }
    else{
      setError((prevError)=>({...prevError,title:""}))
      return true
    }
  };

  const validateAuthor = (author) => {
  console.log( 'author validating')
  
  if(!author){
       setError((prevError)=>({ ...prevError, author: "Author is required" }))
       return false;

    }
    else if(author.length<5){
      
      setError(prevError=>({ ...prevError, author: "Author must have atleast 5 characters" }))
      return false;
    }
    else if( author.length>30){
       setError(prevError=>({ ...prevError, author: "Author cam have 30 characters at most" }))
       return false;

    }
    else if(typeof author !== 'string'){
      setError(prevError=>({ ...prevError, author: "Author must have to be a valid string" }))
      return false
      
    }
    else {
      setError(prevError=>({...prevError,author:''}))
      return true
    }

  };
  
  const validateDescription = (description) => {
    console.log( 'description validating')
    if(!description){
      setError(prevError=>({ ...prevError, description: "Description is required" }))
       return false
    }
    else if(description.length<50){
      setError(prevError=>({
  ...prevError,
        description: "Description must have atleast 50 characters",
      }))
    return false
    }
    else if(description.length>200){
      setError(prevError=>({
  ...prevError,
        description: "Description must have atmost 200 characters",
      }))
      return false;
    }
    else if(typeof description !== 'string'){
      setError(prevError=>({
  ...prevError,
        description: "Description must have to be a valid string",
      }))
      return false
    }
    else{
      setError(prevError=>({ ...prevError, description: "" }));
      return true
    }
  };
  
  const validateContent = (content) => {
    console.log( 'content validating')
    if(!content){
      setError(prevError=>({ ...prevError, content: "Content is required" }))
      return false;
    }
    else if(content.length<50){
      setError(prevError=>({
  ...prevError,
        content: "Content must have atleast 50 characters",
      }))
      return false
    }
    else{
      setError(prevError=>({...prevError,content:''}))
      return true
    }

  };

  const validatePhoto = (photo) => {
    console.log("photo validation starts");
    

    if(!photo){setError(prevError=>({...prevError,photo:"Photo is required"}))
    return false
  }
    else if(photo.type!== 'image/png'&&photo.type!=='image/jpeg'&&photo.type!=='image/jpeg'){
      setError(prevError=>({...prevError,photo:"The file must have to be a valid image"}))
      return false
    }
    else if(photo.size>10*1024*1024){
      setError(prevError=>({...prevError,photo:"The image size must not exceed 10MB"}))
      return false
    }
    else{
      setError(prevError=>({...prevError,photo:''}))
      return true;
    }
  };

  const handleTitleChange = (e) => {
    setBlog({
      ...blog,
    title: e.target.value,
    });
      validateTitle(e.target.value);
    
  };
  const handleDescriptionChange = (e) => {
    setBlog({
      ...blog,
      description: e.target.value,
    });
      validateDescription(e.target.value);
  };
  const handleContentChange = (e) => {
    setBlog({
      ...blog,
      content: e.target.value,
    });
      validateContent(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setBlog({
      ...blog,
      author: e.target.value,
    });
      validateAuthor(e.target.value);
  };

  const handlePhotoChange =async (e) => {
    const uploadedFile = e.target.files[0];
   const response = validatePhoto(uploadedFile);
        if(response){
          try{
            const resized =  await resizePhoto(uploadedFile)
            console.log(resized ,'The resized in change')
            setSelectedFile(resized)

          }
          catch(error){
            console.log("error resizing the image",error)
          }
        }
        else{
          setSelectedFile(null)
        }
  };

  const handleBlurFlag = (field) => {
    setBlurFlag((prevState) => ({ ...blurFlag, [field]: true }));
    if(field==='title'){ validateTitle(blog.title)}
    else if(field==='content'){ validateContent(blog.content)}
    else if(field==='author'){ validateAuthor(blog.author)}
    else if(field==='description'){ validateDescription(blog.description)}
  };
                   
  if (submitted) {
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  }
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.form}>
        <h1 className={styles.mainHeading}>CREATE BLOG POST</h1>
        <>
          <input
            disabled={submitting}
            onBlur={() => handleBlurFlag("title")}
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
            disabled={submitting}
            onBlur={(_) => handleBlurFlag("author")}
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
            disabled={submitting}
            onBlur={(_) => handleBlurFlag("description")}
            value={blog.description}
            onChange={handleDescriptionChange}
            className={styles.description}
            name=""
            id=""
            cols="30"
            rows="3"
            placeholder="Enter description here"
          ></textarea>
          {error.description ? (
            <p className={styles.errormessage}>{error.description} </p>
          ) : (
            <p className={styles.alter}>A</p>
          )}
        </>

        <>
          <textarea
            disabled={submitting}
            onBlur={(_) => handleBlurFlag("content")}
            value={blog.content}
            onChange={handleContentChange}
            className={styles.content}
            name=""
            id=""
            cols="30"
            rows="15"
            placeholder="Enter your content here"
          ></textarea>
          {error.content ? (
            <p className={styles.errormessage}>{error.content}</p>
          ) : (
            <p className={styles.alter}>A</p>
          )}
        </>

        <div className={styles.photoCover}>
          <label
            disabled={submitting}
            tabIndex={0}
            className={styles.photoLabel}
            htmlFor="inputfile"
          >
            Choose a photo
          </label>
          <input
            ref={fileInputRef}
            disabled={submitting}
            className={styles.photo}
            type="file"
            onChange={handlePhotoChange}
            name="inputfile"
            id="inputfile"
          />

          {selectedFile ? (
            <p className={styles.photoInfo}>{selectedFile.name}</p>
          ) : (
            <p className={styles.photoInfo}>No File Choosen</p>
          )}
        </div>
        {error.photo ? (
          <p className={styles.errormessage}>{error.photo}</p>
        ) : (
          <p className={styles.alter}>A</p>
        )}
        <button 
        disabled={submitting}
          className={styles.submit}
          onClick={ _=>{
           const titleRes = validateTitle(blog.title)
           const authorRes =  validateAuthor(blog.author)
           const descriptionRes = validateDescription(blog.description)
           const contentRes = validateContent(blog.content)
           const photoRes =  validatePhoto(selectedFile)
            if(photoRes&&titleRes&&authorRes&&descriptionRes&&contentRes&&blog.title&&blog.author&&blog.content&&blog.description&&selectedFile){
            setSubmitting(true)
            postData()
            }
            }}
        >
          {submitting ? "Submitting" : "Submit Blog"}
          <TailSpin
            height="30"
            width="30"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius=".1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={submitting ? true : false}
          />
        </button>
        {submitted ? (
          <div className={styles.submitted}>
            <p className={styles.submittedText}>Submitted Successfully</p>
            <BiSolidCheckCircle className={styles.submittedIcon} />
          </div>
        ) : (
          ""
        )}
        {/* <img style={{width:'300px',height:'300px'}} src={selectedFile?URL.createObjectURL(selectedFile):''} alt="" /> */}
      </div>
    </div>
  );
}
