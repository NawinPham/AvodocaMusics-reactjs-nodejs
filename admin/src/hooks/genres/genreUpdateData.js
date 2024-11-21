import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const genreUpdateData = (genre_id, token) => {
    const [genreInfo, setGenreInfo] = useState({
        name: "",
        description: ""
    })

    const updateInfo = useCallback((info) => { setGenreInfo(info) }, [])

    const updateGenre = useCallback(async (e) => {
        e.preventDefault();

        const response = await postRequest(`${baseUrl}/genres/update/${genre_id}`, JSON.stringify(genreInfo), token)

        ToastrService.success(response.message)
    }, [genre_id, token])

    return { genreInfo, updateInfo, updateGenre }
}