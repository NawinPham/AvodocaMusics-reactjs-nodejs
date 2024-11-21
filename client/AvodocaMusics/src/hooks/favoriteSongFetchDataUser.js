import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

export const favoriteSongFetchDataUser = (token) => {
    const [favoriteSongDataUser, setFavoriteSongDataUser] = useState({ data: [] })
    const [favoriteSongError, setFavoriteSongError] = useState(null)
    const [favoriteSongLoading, setFavoriteSongLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setFavoriteSongLoading(true)
            setFavoriteSongError(null)

            const response = await getRequest(`${baseUrl}/favoriteSongs/getAllUser`, token)

            setFavoriteSongLoading(false)

            if (response.error) setFavoriteSongError(response)

            setFavoriteSongDataUser(response)
        }
        fetchData()
    }, [token])

    return { favoriteSongDataUser, favoriteSongError, favoriteSongLoading }
}

export const getHighFavoriteSong = () => {
    const [dataSong, setDataSong] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/favoriteSongs/getHotSong`)
            setDataSong(response)
        }
        fetchData()
    }, [])

    return dataSong
}

