import { getCaseTypes, getFirmUsers } from "../actions"
import { getDirectoryContacts } from "../../directory/actions"
import { getClients } from "../../clients/actions"
import NewCaseClientPage from "./client-page"

export default async function NewCasePage() {
    const [clientsData, typesData, dirData, usersData] = await Promise.all([
        getClients() || [],
        getCaseTypes() || [],
        getDirectoryContacts() || [],
        getFirmUsers() || []
    ])

    return (
        <NewCaseClientPage
            initialClients={clientsData}
            initialTypes={typesData}
            initialDirectoryContacts={dirData}
            initialFirmUsers={usersData}
        />
    )
}
