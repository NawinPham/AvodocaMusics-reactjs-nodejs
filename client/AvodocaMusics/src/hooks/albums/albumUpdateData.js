import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const albumUpdateData = (onUpdate, album_id, token) => {
    const [albumInfo, setAlbumInfo] = useState({
        name: "",
        image: null,
        description: ""
    })
    const [albunLoading, setAlbumLoading] = useState(false)
    const [albumError, setAlbumError] = useState(null)

    const updateAlbumInfo = useCallback((info) => setAlbumInfo(info), [])

    const updateAlbum = async () => {
        setAlbumLoading(true)
        setAlbumError(null)

        const response = await postRequest(`${baseUrl}/albums/update/${album_id}`, JSON.stringify(albumInfo), token)

        setAlbumLoading(false)

        if (response.error) {
            setAlbumError(response)
            return;
        }
        if (onUpdate) {
            onUpdate(response.data)
        }
        ToastrService.success(response.message)
    }

    return { albumInfo, albumError, albunLoading, updateAlbumInfo, updateAlbum, }
}