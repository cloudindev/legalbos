import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BrainCircuit, Send, Scale } from "lucide-react"

export default async function AIPage() {
    const session = await auth()

    if (!session?.user?.tenantId) {
        return <div>Entorno inválido.</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">IA Legal Asistida (RAG)</h2>
                    <p className="text-sm text-muted-foreground">
                        Asistente de redacción potenciado por tus expedientes y conocimiento del despacho.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Panel izquierdo: Controles e Ingesta */}
                <div className="space-y-6 md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center">
                                <Scale className="mr-2 h-5 w-5" /> Configuración RAG
                            </CardTitle>
                            <CardDescription>Selecciona la base legal para este escrito</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Plantilla Base</label>
                                <select className="w-full p-2 rounded-md border text-sm bg-white">
                                    <option>Escrito de Demanda Civil</option>
                                    <option>Recurso de Apelación</option>
                                    <option>Contrato Arrendamiento</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Contexto (Expediente)</label>
                                <Input placeholder="Buscar por Ref o Titulo..." />
                            </div>
                            <Button className="w-full mt-4" variant="secondary">Inyectar Jurisprudencia</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Panel principal: Chat y Redactor */}
                <div className="md:col-span-2">
                    <Card className="h-[600px] flex flex-col">
                        <CardHeader className="border-b">
                            <CardTitle className="text-lg">Chat de Redacción Asistida</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                            <div className="flex gap-3">
                                <div className="bg-primary/10 text-primary p-3 rounded-lg rounded-tl-none max-w-[80%]">
                                    <p className="text-sm">Hola. Soy el asistente legal de {session.user.name}. He cargado la plantilla de demanda civil. ¿Dime cuáles son los hechos principales a redactar?</p>
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-4 border-t bg-white">
                            <div className="flex gap-2 relative">
                                <Input
                                    placeholder="Ej. El cliente pagó la señal pero la promotora no entregó a tiempo..."
                                    className="pr-12"
                                />
                                <Button size="icon" className="absolute right-1 top-1 h-8 w-8">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-2">
                                La IA puede cometer errores o alucinar citas jurídicas. Siempre verifica el contenido resultante.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
// Memoria Técnica: UI Placeholder para MVP RAG.
// Incorpora mitigaciones UX de guardrails ("Siempre verifica el contenido resultante").
