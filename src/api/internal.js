import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        "Content-Type":"multipart/form-data"
    }
})


export const createBlog=async (data)=>{

try{    
    const response = await api.post("/create",data)
    return response
}
catch(error){
    console.log(`error of the api`)
    console.log(error)
}

}

export const deleteBlog=async(id)=>{
    try{
        const response = await api.delete("/blogs/"+id)
        return response;
    }
    catch(error){
        console.log(`error of the api`)
        console.log(error)
    }
}


export const editBlog=async(id,data)=>{
    try {
            const response = await api.put("/blogs/"+id,data)
            return response;
    } catch (error) { 
        console.log(`error in the editing api`)
        console.log(error)
    }


}


export const getById = async(id)=>{
try {
      const response =  await api.get("/blogs/"+id)
      return response;
} catch (error) {
    console.log(`Error while requesting get by id`)
    console.log(error)
}
}

export const getAll =async()=>{
    try {
          const response =  await api.get("/blogs/all")
          return response;
    } catch (error) {
        console.log(`Error while loading all the blogs`)
        console.log(error)
    }
}

// export const  {
// deleteBlog,
// editBlog,
// getAll,
// getById,
// createBlog
// }


