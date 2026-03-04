import { getCaseFiles, getCasePhases } from "./actions"
import CasesClientPage from "./client-page"

export default async function CasesPage() {
    // SSR parallel data fetching for zero-waterfall loading state
    const [cases, phases] = await Promise.all([
        getCaseFiles(),
        getCasePhases()
    ])

    return <CasesClientPage initialCases={cases} initialPhases={phases} />
}
