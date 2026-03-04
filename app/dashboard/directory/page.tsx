import { getDirectoryContacts, getContactCategories } from "./actions"
import DirectoryClientPage from "./client-page"

export default async function DirectoryPage() {
    // SSR parallel data fetching for zero-waterfall loading state
    const [contacts, categories] = await Promise.all([
        getDirectoryContacts(),
        getContactCategories()
    ])

    return <DirectoryClientPage initialContacts={contacts} initialCategories={categories} />
}
