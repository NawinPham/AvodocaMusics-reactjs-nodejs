import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"
import songFetchData from "./songFetchData"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContetx"


export const songUpdateData = (song_id, token) => {

    const [songInfo, setSongInfo] = useState({
        name: "",
        image: null,
        description: "",
        url: null,
        genre_id: null
    })
    const [songError, setSongError] = useState(null)
    const [songLoading, setSongLoading] = useState(false)

    const updateSongInfo = useCallback((info) => {
        setSongInfo(info)
    }, [])

    const updateSong = useCallback(async () => {
        setSongLoading(true)
        setSongError(null)

        const response = await postRequest(`${baseUrl}/songs/update/${song_id}`, JSON.stringify(songInfo), token)

        setSongLoading(false)

        if (response.error) {
            setSongError(response.message)
            return
        }
        ToastrService.success(response.message)



    }, [songInfo, song_id, token])

    return { songInfo, songError, songLoading, updateSongInfo, updateSong }
}

