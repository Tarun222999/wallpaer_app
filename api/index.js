import axios from "axios";

const API_KEY = '43340011-4210f1e50cdc096b813c6fe4c';


let apiURL = `https://pixabay.com/api/?key=${API_KEY}`

const formatUrl=(params)=>{
    let url=apiURL+"&per_page=25&safesearch=true&editors_choice=true"
    if(!url){
        return url
    }
    let paramKeys=Object.keys(params)
    paramKeys.map(key=>{
        let value=key=='q'?encodeURIComponent(params[key]):params[key]
        url+=`&${key}=${value}`
    })
   
    return url
}


export const apiCall=async(params)=>{
    try {
        const response=await axios.get(formatUrl(params))
        const {data}=response

        return {
            success:true,
            data
        }
    } catch (error) {
       
        return {
            success:false,
            msg:error.message
        }
    }
}