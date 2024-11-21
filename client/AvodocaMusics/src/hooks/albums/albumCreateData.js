import { useCallback, useState } from "react"
import ToastrService from "../../utils/toastr"
import { baseUrl, postRequest } from "../../utils/service"

export const albumCreateData = (token, onCreate) => {
    const [albumInfoCreate, setAlbumInfoCreate] = useState({
        name: "",
        image: null,
        description: ""
    })
    const [albumError, setAlbumError] = useState(null)
    const [albumLoading, setAlbumLoading] = useState(false)

    const updateAlbumInfoCreate = useCallback((info) => setAlbumInfoCreate(info), [])

    const createAlbum = useCallback(async () => {
        setAlbumLoading(true)
        setAlbumError(null)

        const response = await postRequest(`${baseUrl}/albums/create`, JSON.stringify(albumInfoCreate), token)

        setAlbumLoading(false)

        if (response.error) {
            setAlbumError(response)
            return;
        }

        if (onCreate) {
            onCreate(response.data)
        }
        ToastrService.success(response.message)

    }, [albumInfoCreate, token])

    return { albumInfoCreate, albumError, albumLoading, updateAlbumInfoCreate, createAlbum }
}