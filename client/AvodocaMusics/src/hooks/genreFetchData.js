import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

export const genreFetchData = () => {
    const [genreData, setGenreData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/genres/getAll`)
            setGenreData(response)
        }
        fetchData()
    }, [])

    return { genreData }
}

export const genreIdFetchData = (genreId) => {
    const [genreData, setGenreData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/genres/getId/${genreId}`)
            setGenreData(response)
        }
        fetchData()
    }, [genreId])

    return genreData
}

export const genreSongFetchData = (genreId, page) => {
    const [songData, setSongData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/songs/genre/${genreId}?page=${page}`)
            setSongData(response)
        }
        fetchData()
    }, [genreId, page])

    return songData
}
