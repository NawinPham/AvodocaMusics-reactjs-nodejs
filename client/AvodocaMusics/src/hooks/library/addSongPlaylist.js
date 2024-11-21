import { baseUrl, postRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";

export const addSongPlaylist = async (song_id, playlist_id, token) => {
    const response = await postRequest(
        `${baseUrl}/playlistSongs/create/songs/${song_id}`,
        JSON.stringify({ playlistId: playlist_id }),
        token
    );

    if (response.error) {
        ToastrService.error(response.message);
        return;
    }

    ToastrService.success(response.message);
}