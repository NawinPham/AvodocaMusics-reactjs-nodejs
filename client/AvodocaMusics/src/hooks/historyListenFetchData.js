import {  useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

export const historyListenFetchData = ( token, page) => {
    const [historyListenData, setHistoryListenData] = useState([])
    const [historyListenError, setHistoryListenError] = useState(null)
    const [historyListenLoading, setHistoryListenLoading] = useState(false)

    
    useEffect(() => {
        const fetchData = async () => {
            setHistoryListenLoading(true)
            setHistoryListenError(null)

            const response = await getRequest(`${baseUrl}/historyListens/getAllUser?page=${page}`, token)
            
            setHistoryListenData(response)
            
            setHistoryListenLoading(false)

            if (response.error) {
                setHistoryListenError(response)
            }
        }
        fetchData()
    }, [token,page])
    
    return { historyListenData, historyListenError, historyListenLoading }
}

