import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


export const albumSongFetchData = (album_id) => {
    const [albumSongData, setAlbumSongData] = useState([])
    const [albumSongError, setAlbumSongError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/albumSongs/getAllUserAlbumSong/${album_id}`)

            if (response.error) {
                setAlbumSongError(response.message)
                return;
            }

            setAlbumSongData(response)
        }
        fetchData()
    }, [album_id])

    return { albumSongData,setAlbumSongData, albumSongError }
}

