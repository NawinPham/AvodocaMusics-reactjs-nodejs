import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"

const albumHotFetchData = () => {
    const [albumHotData, setAlbumHotData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/albums/getAll`)
            setAlbumHotData(response)
        }
        fetchData()
    }, [])

    return { albumHotData }
}

export default albumHotFetchData