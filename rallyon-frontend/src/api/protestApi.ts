import axios from 'axios'
import {type Protest} from '../types/Protest'

const BASE_URL = 'http://localhost:8080' // 백엔드 주소

export async function fetchProtests(platform: string): Promise<Protest[]> {

    try{
    const response = await axios.get(`${BASE_URL}/schedule/`, {params:{platform}})
    console.log("📦 받아온 protestsData (raw):", JSON.stringify(response.data, null, 2))
    return response.data
     } catch(e) {
        console.error('❌ fetchProtests 실패:', e)
        throw e
     }
}
