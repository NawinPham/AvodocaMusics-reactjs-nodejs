import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"


export const commentFetchData = (songId) => {
    const [cmtData, setCmtData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/comments/getAll/${songId}`)

            setCmtData(response)
        }

        fetchData()
    }, [])

    return { cmtData, setCmtData }
}