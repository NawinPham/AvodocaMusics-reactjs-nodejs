import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../utils/service"

export const getIdUserFetchData = (userId) => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/users/getId/${userId}`)

            setUserData(response.data)
        }

        fetchData()
    }, [])

    return { userData }
}