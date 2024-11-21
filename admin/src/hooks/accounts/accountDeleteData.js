import { baseUrl, getRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const accountDeleteData = async ({ account_id, token }) => {
    const response = await getRequest(`${baseUrl}/users/deleteUser/${account_id}`, token)
    if (response.error) {
        ToastrService.error(response.message)
        return;
    }

    ToastrService.success(response.message)
}