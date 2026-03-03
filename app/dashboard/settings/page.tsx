"use client"

import { useEffect, useState } from "react"
import { getTenantSettings, updateAiSettings } from "./actions"
import { Settings, Sparkles, Key, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
    const [settings, setSettings] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Form
    const [claudeApiKey, setClaudeApiKey] = useState("")
    const [aiEnabled, setAiEnabled] = useState(false)

    useEffect(() => {
        async function load() {
            const data = await getTenantSettings()
            if (data) {
                setSettings(data)
                setClaudeApiKey(data.claudeApiKey || "")
                setAiEnabled(data.aiEnabled || false)
            }
            setLoading(false)
        }
        load()
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        await updateAiSettings({
            claudeApiKey: claudeApiKey.trim(),
            aiEnabled
        })
        setSaving(false)
        alert("Ajustes guardados correctamente")
    }

    if (loading) return null

    return (
        <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex items-center gap-3 mb-8">
                <Settings className="h-8 w-8 text-[#0B1528]" />
                <h1 className="text-3xl font-extrabold text-[#0B1528] tracking-tight">Ajustes del Despacho</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Sección IA */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                            <Sparkles className="h-6 w-6 text-purple-600" />
                            <h2 className="text-xl font-bold text-gray-900">Inteligencia Artificial</h2>
                        </div>

                        <p className="text-sm text-gray-500 font-medium">
                            Configura las credenciales de Claude (Anthropic) para habilitar el análisis y resumen automático de documentos subidos al Muro de Actuaciones.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Key className="w-4 h-4 text-gray-400" /> API Key de Claude
                                </label>
                                <input
                                    type="password"
                                    value={claudeApiKey}
                                    onChange={(e) => setClaudeApiKey(e.target.value)}
                                    placeholder="sk-ant-api03-..."
                                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0B1528] focus:border-[#0B1528] transition-all"
                                />
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={aiEnabled}
                                        onChange={(e) => setAiEnabled(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                                <div>
                                    <span className="text-sm font-bold text-gray-900 block">Activar procesamiento de IA</span>
                                    <span className="text-xs text-gray-500">Al subir un documento, se creará un resumen y categoría de forma automática.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-11 px-8 rounded-full shadow-sm"
                        >
                            {saving ? "Guardando..." : <><Save className="w-4 h-4 mr-2" /> Guardar Ajustes</>}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
