import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        "Content-Type":"multipart/form-data"
    }
})


async function createBlog (data){


try{
    const response = await api.post("/create",data)
    return response
}
catch(error){
    console.log(`error of the api`)
    console.log(error)
}

}

async function deleteBlog(id){
    try{
        const response = await api.delete("/blogs/"+id)
        return response;
    }
    catch(error){
        console.log(`error of the api`)
        console.log(error)
    }
}


async function editBlog(id){
    try {
            const response = await api.put("/blogs/"+id)
            return response;
    } catch (error) {
        console.log(`error in the editing api`)
        console.log(error)
    }


}


async function getById(id){
try {
      const response =  await api.get("/blogs/"+id)
      return response;
} catch (error) {
    console.log(`Error while requesting get by id`)
    console.log(error)
}
}

async function getAll (){
    try {
          const response =  await api.get("/blogs/all")
          return response;
    } catch (error) {
        console.log(`Error while loading all the blogs`)
        console.log(error)
    }
}

module.exports = {
deleteBlog,
editBlog,
getAll,
getById,
createBlog
}


