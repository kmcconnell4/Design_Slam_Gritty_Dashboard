# Gritty's People Leader Dashboard — Copilot Build Brief

---

## 📋 Summary

Build a **single-page, read-only dashboard** for a people leader ("Gritty") in the Philadelphia metro market. The dashboard gives Gritty a real-time-style view of his consulting team — who they are, where they're deployed, how they're performing, and where they might fit next. All data is sourced from static mock JSON files. The app should feel like an internal ops tool: dense with information but clean and easy to scan.

---

## 🎨 Design

- **Tone:** Professional, utilitarian, slightly edgy — think internal tool meets sports analytics board. Lean into the Philly/Gritty persona subtly (orange accent color, bold typography).
- **Color palette:**
  - Primary: `#F47B20` (Gritty orange)
  - Surface/background: `#1A1A2E` (dark navy)
  - Card background: `#16213E`
  - Text: `#EAEAEA`
  - Success/healthy: `#4CAF50`
  - Warning/at-risk: `#FFC107`
  - Danger/critical: `#F44336`
- **Typography:** Use Vuetify's default Roboto stack. Section headers bold and uppercase. Data values large and prominent.
- **Density:** Use Vuetify's `density="compact"` on tables and lists. Cards should feel information-rich, not spacious.
- **Flags & badges:** Use colored chips and icon badges liberally to surface status at a glance (e.g., "Rolling Off Soon", "On PTO", "High Fit").

---

## 🖱️ Interactions

- **Tabs or anchor navigation** at the top to jump between the three main sections: `Roster & Availability`, `Performance Metrics`, and `Role Matchmaker`.
- **Filtering:** A global filter bar at the top allows filtering by consultant name or skill tag. Filters apply across all three sections.
- **Expandable rows:** In the Roster table, clicking a row expands to show additional detail (skills, bio blurb, upcoming PTO list).
- **Tooltips:** Hover tooltips on utilization bars and chart data points to show raw numbers.
- **Role Matchmaker cards:** Each match card has a "fit score" badge and a collapsible list of reasons why the consultant is a good match.
- **No form submissions or API calls.** All interactions are client-side only.

---

## 📐 Layout

The app is a **single scrollable page** with a fixed top navigation bar.

```
┌─────────────────────────────────────────────────────────┐
│  🟠 GRITTY'S DASHBOARD   [Filter Bar]        PA Metro   │  ← Fixed AppBar
├─────────────────────────────────────────────────────────┤
│  [ Roster & Availability ] [ Performance ] [ Matchmaker ]│  ← Tab Nav
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SECTION 1: ROSTER & AVAILABILITY                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Summary KPI chips: Total Headcount | Available  │   │
│  │ Soon | On PTO | Fully Staffed                   │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Expandable Data Table (one row per consultant)  │   │
│  │ Cols: Name | Client | Project End | Rolling Off │   │
│  │       Soon | PTO Upcoming | Utilization %       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SECTION 2: PERFORMANCE METRICS                         │
│  ┌──────────────┐ ┌──────────────┐ ┌───────────────┐  │
│  │ Team Util.   │ │ Revenue Sold │ │ Managed Rev.  │  │  ← KPI Cards
│  │ Chart (Bar)  │ │ Chart (Bar)  │ │ Summary Card  │  │
│  └──────────────┘ └──────────────┘ └───────────────┘  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Individual Utilization Table                    │   │
│  │ Cols: Name | Actual % | Target % | Delta | Bar  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  SECTION 3: ROLE MATCHMAKER                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Opportunity Cards (grid, 2-3 per row)            │  │
│  │ Each card: Role Title | Client | Skills Needed   │  │
│  │ Top Matches: Consultant chip + fit score badge   │  │
│  │ [Expand] → reasons for match                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech

| Concern | Choice |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build Tool | Vite 5 |
| Language | TypeScript (strict mode) |
| UI Library | Vuetify 3 |
| Icons | Material Design Icons (`@mdi/font`) |
| Charts | Chart.js + `vue-chartjs` |
| Data | Static JSON files in `/src/data/` |
| State | `ref` / `computed` / `provide` only — no Pinia needed |
| Routing | None — single page, tab-based navigation only |
| Deployment | Vercel (static output via `vite build`) |

**Component structure:**
```
src/
├── App.vue
├── components/
│   ├── AppHeader.vue
│   ├── GlobalFilter.vue
│   ├── roster/
│   │   ├── RosterSection.vue
│   │   ├── RosterTable.vue
│   │   └── RosterKPIBar.vue
│   ├── performance/
│   │   ├── PerformanceSection.vue
│   │   ├── UtilizationChart.vue
│   │   ├── RevenueChart.vue
│   │   └── UtilizationTable.vue
│   └── matchmaker/
│       ├── MatchmakerSection.vue
│       └── OpportunityCard.vue
├── data/
│   ├── consultants.json
│   ├── opportunities.json
│   └── performance.json
└── types/
    └── index.ts
```

---

## 🗄️ Data

All mock data lives in `/src/data/` as static JSON. Define TypeScript interfaces in `/src/types/index.ts` to match each schema.

### `consultants.json`
```json
[
  {
    "id": "c1",
    "name": "Marcus Webb",
    "title": "Senior Consultant",
    "skills": ["Change Management", "Workday", "PMO"],
    "client": "Jefferson Health",
    "projectEndDate": "2026-05-30",
    "rollingSoon": true,
    "utilization": {
      "actual": 85,
      "target": 80
    },
    "pto": [
      { "start": "2026-05-05", "end": "2026-05-09", "note": "Family vacation" }
    ],
    "bio": "8 years in healthcare transformation. Strong facilitator."
  }
]
```

### `performance.json`
```json
{
  "teamUtilizationTarget": 80,
  "teamUtilizationActual": 76,
  "revenueSold": 1420000,
  "managedRevenue": 3800000,
  "revenueTarget": 1500000,
  "managedRevenueTarget": 4000000,
  "individualMetrics": [
    {
      "consultantId": "c1",
      "revenueSold": 220000,
      "managedRevenue": 580000
    }
  ]
}
```

### `opportunities.json`
```json
[
  {
    "id": "o1",
    "roleTitle": "OCM Lead",
    "client": "SEPTA",
    "startDate": "2026-06-15",
    "requiredSkills": ["Change Management", "Stakeholder Engagement"],
    "preferredSkills": ["Transportation", "PMO"],
    "matches": [
      {
        "consultantId": "c1",
        "fitScore": 92,
        "reasons": [
          "Skills match: Change Management, PMO",
          "Available by project start date",
          "Prior public sector experience"
        ]
      }
    ]
  }
]
```

---

## 🚀 Copilot Prompting Notes

> Include these reminders when prompting Copilot:

- Always use `<script setup lang="ts">` syntax
- Import Vuetify components explicitly — do not rely on auto-import unless configured
- Use `v-data-table` with `expand-on-click` for the roster table
- Charts should use the `vue-chartjs` wrapper components (`Bar`, `Line`) with typed `ChartData` props
- Derive `rollingSoon` flag in computed logic: flag any consultant whose `projectEndDate` is within 42 days of today
- Format all currency values with `Intl.NumberFormat` using `en-US` locale
- Format all dates with `Intl.DateTimeFormat` — no external date libraries
- Keep all filtering logic in a shared composable: `useGlobalFilter.ts`