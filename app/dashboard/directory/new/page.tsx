import { getContactCategories } from "../actions"
import NewDirectoryContactClientPage from "./client-page"

export default async function NewDirectoryContactPage() {
    const categories = await getContactCategories()

    return (
        <NewDirectoryContactClientPage initialCategories={categories} />
    )
}
