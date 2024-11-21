import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

const playlistHotFetchData = () => {
    const [playlistHotData, setPlaylistHotData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/playlists/getAll`)
            setPlaylistHotData(response)
        }
        fetchData()
    }, [])

    return { playlistHotData }
}

export default playlistHotFetchData