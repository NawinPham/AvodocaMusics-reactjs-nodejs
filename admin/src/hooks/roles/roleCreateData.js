import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const roleCreateData = (token, onCreate) => {
    const [roleInfo, setRoleInfo] = useState({
        name: "",
        description: ""
    })

    const roleUpdateInfo = useCallback((info) => setRoleInfo(info), [])

    const roleCreate = useCallback(async () => {

        const response = await postRequest(`${baseUrl}/roles/create`, JSON.stringify(roleInfo), token)

        ToastrService.success(response.message)
        onCreate(response?.data)
    }, [token, roleInfo])

    return { roleInfo, roleUpdateInfo, roleCreate }
}