export interface PTOEntry {
  start: string
  end: string
  note: string
}

export interface UtilizationMetric {
  actual: number
  target: number
}

export interface Consultant {
  id: string
  name: string
  title: string
  skills: string[]
  client: string
  projectEndDate: string
  rollingSoon?: boolean
  utilization: UtilizationMetric
  pto: PTOEntry[]
  bio: string
}

export interface IndividualMetric {
  consultantId: string
  revenueSold: number
  managedRevenue: number
}

export interface PerformanceSnapshot {
  teamUtilizationTarget: number
  teamUtilizationActual: number
  revenueSold: number
  managedRevenue: number
  revenueTarget: number
  managedRevenueTarget: number
  individualMetrics: IndividualMetric[]
}

export interface OpportunityMatch {
  consultantId: string
  fitScore: number
  reasons: string[]
}

export interface Opportunity {
  id: string
  roleTitle: string
  client: string
  startDate: string
  requiredSkills: string[]
  preferredSkills: string[]
  matches: OpportunityMatch[]
}
