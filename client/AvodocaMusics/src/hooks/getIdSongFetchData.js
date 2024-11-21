import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"


const getIdSongFetchData = (song_id) => {
    const [songData, setSongData] = useState(null)
    const [songError , setSongError] = useState(null)
    const [songLoading , setSongloading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setSongloading(true)
            setSongError(null)

            const response = await getRequest(`${baseUrl}/songs/getId/${song_id}`)
            
            setSongData(response)

            setSongloading(false)

            if (response.error) {
                setSongError(response)
            }
        }

        fetchData()
    },[song_id])

    return {songData , songError , songLoading}
}

export default getIdSongFetchData