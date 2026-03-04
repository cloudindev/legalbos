import { getClients } from "./actions"
import ClientsClientPage from "./client-page"

export default async function ClientsPage() {
    // Fetch data perfectly on the server with 0 loading waterfalls before sending UI to the user
    const clients = await getClients()

    return <ClientsClientPage initialClients={clients} />
}
