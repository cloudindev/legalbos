"use client"

import { useEffect, useState } from "react"
import { getTenantSettings, updateTenantSettings } from "../actions"
import { Sparkles, Key, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsAIPage() {
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
        await updateTenantSettings({
            ...settings,
            claudeApiKey: claudeApiKey.trim(),
            aiEnabled
        })
        setSaving(false)
        alert("Ajustes de IA guardados")
    }

    if (loading) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 flex items-center justify-center bg-purple-50 text-purple-600 rounded-full">
                    <Sparkles className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#0B1528] tracking-tight">Inteligencia Artificial</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSave} className="space-y-8" autoComplete="off">
                    <div className="space-y-6">
                        <p className="text-sm text-gray-500 font-medium">
                            Configura tu API Key (Gemini / Claude) para habilitar el análisis y extracción automática de datos en documentos subidos.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <Key className="w-4 h-4 text-gray-400" /> API Key de IA (Gemini)
                                </label>
                                <input
                                    type="password"
                                    value={claudeApiKey}
                                    onChange={(e) => setClaudeApiKey(e.target.value)}
                                    placeholder="AIzaSyA..."
                                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0B1528] focus:border-[#0B1528] transition-all font-mono"
                                    autoComplete="new-password"
                                    data-lpignore="true"
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
                                    <span className="text-xs text-gray-500">Al subir un documento o crear un expediente, la IA procesará la información automáticamente.</span>
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
