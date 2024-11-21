import { useEffect, useState } from "react"
import { baseUrl, getRequest } from "../../utils/service"


export const accountFetchData = (token, page) => {
    const [accountData, setAccountData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(`${baseUrl}/users/getAll?page=${page}`, token)

            setAccountData(response)
        }
        fetchData()
    }, [token, page])

    return { accountData }
}