import { useCallback, useState } from "react"
import { baseUrl, postRequest } from "../../utils/service"
import ToastrService from "../../utils/toastr"


export const artistCreateData = ( token) => {
    const [artistInfo, setArtistInfo] = useState({
        name: "",
        bio: "",
        debutDate : null
    })
    const [artistError , setArtistError] = useState(null)
    const [artistLoading , setArtistLoading] = useState(false)

    const artistUpdateInfo = useCallback((info) => setArtistInfo(info),[])

    const artistCreate = useCallback(async (e) => {
        e.preventDefault();
        setArtistLoading(true)

        const response = await postRequest(`${baseUrl}/artists/ucreate`,JSON.stringify(artistInfo),token)

        setArtistLoading(false)

        if (response.error) {
            setArtistError(response.message)
            return;
        }

        ToastrService.success(response.message)
    }, [ token])
    
    return {artistInfo , artistError , artistLoading , artistUpdateInfo , artistCreate}
}