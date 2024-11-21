import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"

export const addSongAlbum = async (album_id, song_id, token) => {
    const response = await postRequest(`${baseUrl}/albumSongs/create/${album_id}/songs/${song_id}`, null, token)

    if (response.error) {
        ToastrService.error(response.message)
        return
    }

    ToastrService.success(response.message)
}