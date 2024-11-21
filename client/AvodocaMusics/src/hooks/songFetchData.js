import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { baseUrl, getRequest } from "../utils/service"


export const songFetchData = (token, page) => {
    const [songData, setSongData] = useState([])
    const [songError, setSongError] = useState(null)
    const [songLoading, setSongloading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setSongloading(true)
            setSongError(null)

            const response = await getRequest(`${baseUrl}/songs/getAllUserSongs?page=${page}`, token)
            const { currentPage, totalPages } = response;

            setSongData(response)
            setCurrentPage(currentPage);
            setTotalPages(totalPages);

            setSongloading(false)

            if (response.error) {
                setSongError(response)
            }
        }

        fetchData()
    }, [token, page])

    return { songData, setSongData, songError, songLoading, totalPages, currentPage }
}
