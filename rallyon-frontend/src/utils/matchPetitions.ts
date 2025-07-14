import { type Petition } from '../types/Petition'

export function matchPetitions(protestTitle: string, petitions: Petition[]): Petition[] {
  const lowerTitle = protestTitle.toLowerCase()
  return petitions.filter((petition) =>
    petition.keywords.some((kw) => lowerTitle.includes(kw.toLowerCase()))
  )
}
