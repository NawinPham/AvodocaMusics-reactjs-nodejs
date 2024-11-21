import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


export const roleFetchData = (token) => {
    const [roleData, setRoleData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/roles/getAll`, token)

            setRoleData(response)
        }
        fetchData()
    }, [token])

    return { roleData, setRoleData }
}