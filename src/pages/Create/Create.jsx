import styles from "./Create.module.css";
import { useState, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { createBlog } from "../../api/internal.js";
import { resizePhoto } from "./resizer";
import { BiSolidCheckCircle } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
export default function Create() {
  /*********THE STATES**********/
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resizedImage, setResizedImage] = useState(null);
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
    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("description", blog.description);
    formData.append("author", blog.author);
    formData.append("file", resizedImage);

    const response = await createBlog(formData);
    setSubmitting(false);
    console.log(response);

    if (response.status === 201) {
      setSubmitted(true);
    }
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
    setResizedImage(null);
  };

  const validateTitle = (title) => {
    !title
      ? setError({ ...error, title: "Title is required" })
      : title.length < 5
      ? setError({ ...error, title: "Title must have atleast 5 characters" })
      : title.length > 80
      ? setError({ ...error, title: "Title can have 80 characters at most" })
      : typeof title !== "string"
      ? setError({ ...error, title: "Title must have to be a valid string" })
      : setError({ ...error, title: "" });
  };

  const validateAuthor = (author) => {
    !author
      ? setError({ ...error, author: "Author is required" })
      : author.length < 5
      ? setError({ ...error, author: "Author must have atleast 5 characters" })
      : author.length > 30
      ? setError({ ...error, author: "Author cam have 30 characters at most" })
      : typeof author !== "string"
      ? setError({ ...error, author: "Author must have to be a valid string" })
      : setError({ ...error, author: "" });
  };

  const validateDescription = (description) => {
    !description
      ? setError({ ...error, description: "Description is required" })
      : description.length < 50
      ? setError({
          ...error,
          description: "Description must have atleast 50 characters",
        })
      : description.length > 200
      ? setError({
          ...error,
          description: "Description must have atmost 200 characters",
        })
      : typeof description !== "string"
      ? setError({
          ...error,
          description: "Description must have to be a valid string",
        })
      : setError({ ...error, description: "" });
  };

  const validateContent = (content) => {
    !content
      ? setError({ ...error, content: "Content is required" })
      : content.length < 50
      ? setError({
          ...error,
          content: "Content must have atleast 50 characters",
        })
      : typeof content !== "string"
      ? setError({
          ...error,
          content: "Content must have to be a valid string",
        })
      : setError({ ...error, content: "" });
  };

  const validatePhoto = (photo) => {
    console.log("photo validation starts");

    if(!photo){setError({...error,photo:"Photo is required"})
    return false
  }
    else if(photo.type!== 'image/png'&&photo.type!=='image/jpeg'&&photo.type!=='image/jpeg'){
      setError({...error,photo:"The file must have to be a valid image"})
      return false
    }
    else if(photo.size>10*1024*1024){
      setError({...error,photo:"The image size must not exceed 10MB"})
      return false
    }
    else{
      setError({...error,photo:''})
      return true;
    }
      
  };

  const handleTitleChange = (e) => {
    setBlog({
      ...blog,
      title: e.target.value,
    });

    if (blurFlag.title) {
      validateTitle(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => {
    setBlog({
      ...blog,
      description: e.target.value,
    });
    if (blurFlag.description) {
      validateDescription(e.target.value);
    }
  };
  const handleContentChange = (e) => {
    setBlog({
      ...blog,
      content: e.target.value,
    });
    if (blurFlag.content) {
      validateContent(e.target.value);
    }
  };
  const handleAuthorChange = (e) => {
    setBlog({
      ...blog,
      author: e.target.value,
    });
      validateAuthor(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const uploadedFile = e.target.files[0];
   const response = validatePhoto(uploadedFile);
        if(response){
          setSelectedFile(resizePhoto(uploadedFile))
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
          disabled={
            submitting ||
            error.author ||
            error.content ||
            error.description ||
            error.title ||
            error.photo ||
            !blog.title ||
            !blog.author ||
            !blog.content ||
            !blog.description ||
            !selectedFile
          }
          className={styles.submit}
          onClick={postData}
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
