import FileResizer from "react-image-file-resizer";

export const resizePhoto = (uploadedFile) => {

  return new Promise((resolve,reject)=>{

   
    FileResizer.imageFileResizer(
      uploadedFile,
      1200,
      800,
      "JPEG",
      80,
      0,
      async (resizedImage) => {
        console.log(`loggin the resizedImage`, resizedImage);
        const resizedFile = new File([resizedImage], uploadedFile.name, {
          type: uploadedFile.type,
        });
        console.log(resizedFile);
       resolve(resizedFile)
      },
      "blob",
      (error)=>{
        console.log('error resizing file', error)
        reject(error)
      }
    );
  })
  
  };