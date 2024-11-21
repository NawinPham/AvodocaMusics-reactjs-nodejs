import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

const searchSongFetchData = (name , page) => {
    const [searchData , setSearchData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/songs/search?name=${name}&page=${page}`)
            setSearchData(response);
        }
        fetchData()
    },[name,page])
    
    return {searchData}
}

export default searchSongFetchData