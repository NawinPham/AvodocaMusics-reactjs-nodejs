import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


export const artistFetchData = (token) => {
    const [artistData , setArtistData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/artists/getAll`, token)

            setArtistData(response)
        }
        fetchData()
    },[token])

    return {artistData}
}