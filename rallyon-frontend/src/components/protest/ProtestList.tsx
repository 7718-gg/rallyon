import {useEffect, useState} from 'react'
import axios from 'axios'

import ProtestCard from './ProtestCard'
import FilterBar from './FilterBar'

import {type Protest} from '../../types/Protest'
import {type Petition} from '../../types/Petition'
import { fetchProtests } from '../../api/protestApi'
import { CURRENT_PLATFORM } from '../../types/Platform'

export default function ProtestList() {
    const [protests, setProtests] = useState<Protest[]>([])
    const [petitions, setPetitions] = useState<Petition[]>([])
    const [region, setRegion] = useState('')
    const [keyword, setKeyword] = useState('')

    const loadAll = async () => {
        try {
            const [protestsData, petitionsData] = await Promise.allSettled([
                fetchProtests(CURRENT_PLATFORM),
                axios.get('http://localhost:8080/petitions'),
            ])
            console.log("📦 받아온 protestsData:", protestsData)

            if (protestsData.status === 'fulfilled') {
                setProtests(protestsData.value)
                console.log("🔥 setProtests 이후:", protestsData.value)
            } else {
                console.error('❌ Protest 불러오기 실패:', protestsData.reason)
            }
            
            if (petitionsData.status === 'fulfilled') {
                setPetitions(petitionsData.value.data)
            } else {
                console.warn('⚠ Petition API는 아직 구현되지 않음:', petitionsData.reason)
            }

        } catch (error) {
            console.error('데이터 불러오기 실패:', error)
            if (axios.isAxiosError(error)) {
                console.error('❗ AxiosError response:', error.response?.data)
                console.error('❗ AxiosError status:', error.response?.status)
                console.error('❗ AxiosError config:', error.config)
              }
        }
    }

     useEffect(() => {
        loadAll()
     }, [])

    const filtered = protests.filter(
        (p) =>
            p.place.includes(region) &&
            p.title.includes(keyword)
    )

     useEffect(() => {
  console.log("▶ protests 상태 변화 감지:", JSON.stringify(protests, null, 2))
}, [protests])


    return (
        <div className="p-4 max-w-3xl mx-auto">

            <FilterBar
                region={region}
                keyword={keyword}
                onRegionChange={setRegion}
                onKeywordChange={setKeyword}
            />

            {filtered.length > 0 ? (
                filtered.map((protest) => (
                    <ProtestCard
                        key={protest.id}
                        protest={protest}
                        petitions={petitions}
                    />
                ))
            ) : (
                <p className="text-gray-500">조건에 맞는 시위가 없습니다.</p>
            )}
        </div>
    )
}
