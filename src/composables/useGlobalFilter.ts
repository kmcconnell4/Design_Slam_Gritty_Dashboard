import { computed, type Ref } from 'vue'
import type { Consultant, Opportunity } from '../types'

export interface ConsultantWithFlags extends Consultant {
  rollingSoonDerived: boolean
}

const ROLLING_SOON_DAYS = 42

function normalize(input: string): string {
  return input.trim().toLowerCase()
}

function isRollingSoon(projectEndDate: string, today = new Date()): boolean {
  const end = new Date(projectEndDate)
  if (Number.isNaN(end.getTime())) return false
  const msPerDay = 1000 * 60 * 60 * 24
  const dayDelta = Math.ceil((end.getTime() - today.getTime()) / msPerDay)
  return dayDelta >= 0 && dayDelta <= ROLLING_SOON_DAYS
}

export function useGlobalFilter(params: {
  consultants: Ref<Consultant[]>
  opportunities: Ref<Opportunity[]>
  query: Ref<string>
  skill: Ref<string | null>
}) {
  const consultantsWithFlags = computed<ConsultantWithFlags[]>(() => {
    const today = new Date()
    return params.consultants.value.map((consultant) => ({
      ...consultant,
      rollingSoonDerived: isRollingSoon(consultant.projectEndDate, today),
    }))
  })

  const availableSkills = computed<string[]>(() => {
    const set = new Set<string>()
    consultantsWithFlags.value.forEach((consultant) => {
      consultant.skills.forEach((skill) => set.add(skill))
    })
    return [...set].sort((a, b) => a.localeCompare(b))
  })

  const filteredConsultants = computed<ConsultantWithFlags[]>(() => {
    const normalizedQuery = normalize(params.query.value)
    const selectedSkill = params.skill.value

    return consultantsWithFlags.value.filter((consultant) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalize(consultant.name).includes(normalizedQuery) ||
        normalize(consultant.client).includes(normalizedQuery)

      const matchesSkill =
        !selectedSkill || consultant.skills.some((skill) => skill === selectedSkill)

      return matchesQuery && matchesSkill
    })
  })

  const filteredOpportunities = computed<Opportunity[]>(() => {
    const normalizedQuery = normalize(params.query.value)
    const selectedSkill = params.skill.value

    return params.opportunities.value.filter((opportunity) => {
      const searchable = [
        opportunity.roleTitle,
        opportunity.client,
        ...opportunity.requiredSkills,
        ...opportunity.preferredSkills,
      ]
      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchable.some((value) => normalize(value).includes(normalizedQuery))

      const matchesSkill =
        !selectedSkill ||
        opportunity.requiredSkills.includes(selectedSkill) ||
        opportunity.preferredSkills.includes(selectedSkill)

      return matchesQuery && matchesSkill
    })
  })

  return {
    availableSkills,
    filteredConsultants,
    filteredOpportunities,
  }
}
