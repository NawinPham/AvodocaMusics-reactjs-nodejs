import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

export const playlistFetch = (id, token) => {
    const [playlistSongData, setPlaylistSongData] = useState([])
    const [playlistSongError, setPlaylistSongError] = useState(null)
    const [playlistSongLoading, setPlaylistSongLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setPlaylistSongLoading(true)
            setPlaylistSongError(null)

            const response = await getRequest(`${baseUrl}/playlistSongs/getAll/${id}`, token)

            setPlaylistSongData(response)

            setPlaylistSongLoading(false)

            if (response.error) {
                setPlaylistSongError(response)
            }
        }
        fetchData()
    }, [id, token])

    return { playlistSongData, setPlaylistSongData, playlistSongError, playlistSongLoading }
}

