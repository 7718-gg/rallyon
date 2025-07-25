import { type Protest } from '../../types/Protest'
import { type Petition } from '../../types/Petition'

interface Props {
  protest: Protest
  petitions: Petition[]
}

export default function ProtestCard({ protest, petitions }: Props) {
  const matched = petitions.filter((p) =>
    p.keywords.some((kw) => protest.title.includes(kw))
  )

  return (
    <div className="border rounded p-4 shadow mb-4">
      <h2 className="text-lg font-semibold">{protest.title}</h2>
      <p>{protest.date} | {protest.place}</p>

      {matched.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium">📌 관련 청원:</p>
          <ul className="list-disc pl-4 text-sm">
            {matched.map((pet) => (
              <li key={pet.id}>
                <a href={pet.url} target="_blank" className="text-blue-600 underline" rel="noreferrer">
                  {pet.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
