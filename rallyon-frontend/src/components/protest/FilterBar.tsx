interface FilterProps {
  region: string
  keyword: string
  onRegionChange: (value: string) => void
  onKeywordChange: (value: string) => void
}

export default function FilterBar({
  region,
  keyword,
  onRegionChange,
  onKeywordChange,
}: FilterProps) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="지역으로 검색"
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="키워드로 검색"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        className="border p-2 rounded"
      />
    </div>
  )
}
