import { auth } from "@/auth"
import prisma from "@/lib/db/prisma"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FileText, Download, Trash2 } from "lucide-react"

export default async function DocumentsPage() {
    const session = await auth()

    if (!session?.user?.tenantId) {
        return <div>Entorno inválido.</div>
    }

    // Traemos los últimos documentos subidos al tenant, sin importar el expediente
    const documents = await prisma.document.findMany({
        where: { tenantId: session.user.tenantId },
        include: { caseFile: true },
        orderBy: { createdAt: "desc" },
        take: 50
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Repositorio Documental</h2>
                    <p className="text-sm text-muted-foreground">
                        Todos los archivos y escritos vinculados a expedientes.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button>Subir Documento</Button>
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Expediente</TableHead>
                            <TableHead>Tamaño</TableHead>
                            <TableHead>Fecha Subida</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No hay documentos subidos en el sistema.
                                </TableCell>
                            </TableRow>
                        ) : (
                            documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {doc.name}
                                    </TableCell>
                                    <TableCell>{doc.caseFile?.title || "-"}</TableCell>
                                    <TableCell>{doc.size ? `${(doc.size / 1024 / 1024).toFixed(2)} MB` : "Desconocido"}</TableCell>
                                    <TableCell>{doc.createdAt.toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
// Memoria Técnica: RSC que muestra documentos de forma plana limitados a 50
// Permite acceso transversal pero siempre restringido al tenant actual
