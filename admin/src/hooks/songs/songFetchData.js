import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


const songFetchData = (token, page) => {
    const [songData, setSongData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/songs/getAll?page=${page}`, token)

            setSongData(response)
        }
        fetchData()
    }, [token, page])

    return { songData, setSongData }
}

export default songFetchData