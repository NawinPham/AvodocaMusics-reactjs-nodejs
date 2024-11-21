import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

const playlistUserFetchData = (token) => {
    const [playlistDataUser, setPlaylistDataUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/playlists/getAllUserPlaylist`, token)
            setPlaylistDataUser(response)
        }
        fetchData()
    }, [token])

    return { playlistDataUser, setPlaylistDataUser }
}

export default playlistUserFetchData