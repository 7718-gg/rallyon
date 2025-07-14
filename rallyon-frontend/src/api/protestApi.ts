import axios from 'axios'
import { type Protest } from '../types/Protest'

const BASE_URL = 'http://localhost:8080' // 백엔드 주소

export async function fetchProtests(): Promise<Protest[]> {
  const response = await axios.get(`${BASE_URL}/protests`)
  return response.data
}
