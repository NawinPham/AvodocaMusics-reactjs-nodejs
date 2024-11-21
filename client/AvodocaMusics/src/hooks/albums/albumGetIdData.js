import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"

export const albumGetIdData = (album_id) => {
    const [albumData, setAlbumData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/albums/getId/${album_id}`)

            setAlbumData(response)
        }
        fetchData()
    }, [album_id])

    return { albumData ,setAlbumData }
}