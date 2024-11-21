import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const roleUpdateData = (role_id, token) => {
    const [roleInfo, setRoleInfo] = useState({
        name: "",
        description: ""
    })

    const roleUpdateInfo = useCallback((info) => setRoleInfo(info), [])

    const roleUpdate = useCallback(async (e) => {
        e.preventDefault()

        const response = await postRequest(`${baseUrl}/roles/update/${role_id}`, JSON.stringify(roleInfo), token)

        ToastrService.success(response.message)
    }, [role_id, token])

    return { roleInfo, roleUpdateInfo, roleUpdate }
}