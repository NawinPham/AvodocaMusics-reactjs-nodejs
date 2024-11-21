import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"

export const getAlbumBySong = (song_id) => {
    const [albumData, setAlbumData] = useState({})

    useEffect(() => {
        const handler = setTimeout(() => {
            const fetchData = async () => {
                const response = await getRequest(`${baseUrl}/albumSongs/getAlbumBySong/${song_id}`)

                setAlbumData(response)
            }
            fetchData()
        }, 300)

        return () => {
            clearTimeout(handler); // Cleanup the timeout on unmount
        };

    }, [song_id])
    return albumData
}
