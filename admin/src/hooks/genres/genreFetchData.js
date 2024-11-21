import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


export const genreFetchData = (token) => {
    const [genreData , setGenreData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/genres/getAll`)

            setGenreData(response)
        } 
        fetchData()
     },[token])

     return {genreData}
}