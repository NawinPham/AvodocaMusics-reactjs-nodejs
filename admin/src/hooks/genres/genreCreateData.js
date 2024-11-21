import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const genreCreateData = (token) => {
    const [genreInfo, setGenreInfo] = useState({
        name: "",
        description: ""
    })

    const updateInfo = useCallback((info) => { setGenreInfo(info) }, [])

    const genreCreate = useCallback(async (e) => {
        e.preventDefault();

        const response = await postRequest(`${baseUrl}/genres/create`, JSON.stringify(genreInfo), token)

        ToastrService.success(response.message)
    }, [token])

    return { genreInfo, updateInfo, genreCreate }
}