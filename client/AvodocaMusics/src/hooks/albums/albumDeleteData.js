import { baseUrl, getRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const albumDeleteData = async (album_id, token) => {

    const response = await getRequest(`${baseUrl}/albums/delete/${album_id}`, token)

    if (response.error) {
        ToastrService.error(response.message)
        return;
    }

    ToastrService.success(response.message)

}