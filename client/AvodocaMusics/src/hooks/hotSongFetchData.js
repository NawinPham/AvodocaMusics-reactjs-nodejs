import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"


export const hotSongfetchData = (page) => {
    const [hotSongData, setHotSongData] = useState([])

    useEffect(async () => {
        const response = await getRequest(`${baseUrl}/songs/getAll?page=${page}`)
        setHotSongData(response)
    }, [page])

    return { hotSongData }
}