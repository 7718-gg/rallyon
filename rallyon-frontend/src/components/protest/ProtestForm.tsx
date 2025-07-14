import { useState } from 'react'
import axios from 'axios'
import { type Protest } from '../../types/Protest'

const BASE_URL = 'http://localhost:8080'

export default function ProtestForm({ onSubmit }: { onSubmit?: () => void }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newProtest: Omit<Protest, 'id'> = { title, date, location }
    try {
      await axios.post(`${BASE_URL}/protests`, newProtest)
      alert('시위 등록 완료!')
      setTitle('')
      setDate('')
      setLocation('')
      onSubmit?.()
    } catch (error) {
      alert('등록 실패')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">📢 시위 일정 등록</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="장소"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        등록
      </button>
    </form>
  )
}
