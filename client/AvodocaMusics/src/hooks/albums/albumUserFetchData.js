import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


export const albumUserFetchData = (token, page) => {
    const [albumDataUser, setAlbumDataUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/albums/getAllUserAlbum?page=${1}`, token)

            setAlbumDataUser(response)
        }
        fetchData()
    }, [token, page])

    return { albumDataUser, setAlbumDataUser }
}