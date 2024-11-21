import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const accountUpdateData = (account_id, token) => {
    const [accountInfo, setAccountInfo] = useState({
        fullname: "",
        address: "",
        phone: null,
        role_id: 2
    })
    const [accountError, setAccountError] = useState(null)
    const [accountLoading, setAccountLoading] = useState(false)

    const updateAccountInfo = useCallback((info) => setAccountInfo(info), [])

    const updateAccount = useCallback(async (e) => {
        setAccountLoading(true)

        const response = await postRequest(`${baseUrl}/users/updateUser/${account_id}`, JSON.stringify(accountInfo), token)

        setAccountLoading(false)

        if (response.error) {
            setAccountError(response.message)
            ToastrService.error(response.message)
            return;
        }
        ToastrService.success(response.message)

    }, [account_id, token])

    return { accountInfo, accountError, accountLoading, updateAccountInfo, updateAccount }
}