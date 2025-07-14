import { useEffect, useState } from 'react'
import axios from 'axios'

import ProtestCard from './ProtestCard'
import ProtestForm from './ProtestForm'
import FilterBar from './FilterBar'

import { type Protest } from '../../types/Protest'
import { type Petition } from '../../types/Petition'
import { fetchProtests } from '../../api/protestApi'

export default function ProtestList() {
  const [protests, setProtests] = useState<Protest[]>([])
  const [petitions, setPetitions] = useState<Petition[]>([])
  const [region, setRegion] = useState('')
  const [keyword, setKeyword] = useState('')

  const loadAll = async () => {
    try {
      const [protestsData, petitionsData] = await Promise.all([
        fetchProtests(),
        axios.get('http://localhost:8080/petitions'),
      ])
      setProtests(protestsData)
      setPetitions(petitionsData.data)
    } catch (error) {
      console.error('데이터 불러오기 실패:', error)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const filtered = protests.filter(
    (p) =>
      p.location.includes(region) &&
      p.title.includes(keyword)
  )

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RallyOn</h1>

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

      <div className="mt-8">
        <ProtestForm onSubmit={loadAll} />
      </div>
    </div>
  )
}
