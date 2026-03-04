"use client"

import { useEffect, useState } from "react"
import { getUserProfile, updateUserProfile } from "./actions"
import { UserCircle2, Save, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsProfilePage() {
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [editingField, setEditingField] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName1: "",
        lastName2: "",
        email: ""
    })

    useEffect(() => {
        async function load() {
            const data = await getUserProfile()
            if (data) {
                setProfile(data)
                setFormData({
                    firstName: data.firstName || data.name.split(" ")[0] || "",
                    lastName1: data.lastName1 || data.name.split(" ")[1] || "",
                    lastName2: data.lastName2 || "",
                    email: data.email || ""
                })
            }
            setLoading(false)
        }
        load()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateUserProfile(formData)
            setEditingField(null)
            const data = await getUserProfile()
            if (data) setProfile(data)
        } catch (e) {
            alert("Error al guardar datos")
        }
        setSaving(false)
    }

    if (loading) return null

    const EditField = ({ label, fieldName }: { label: string, fieldName: keyof typeof formData }) => {
        const isEditing = editingField === fieldName

        return (
            <div className="flex border-b border-gray-100 py-5">
                <div className="w-1/3">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{label}</span>
                </div>
                <div className="w-2/3 flex items-center justify-between">
                    {isEditing ? (
                        <input
                            type="text"
                            autoFocus
                            value={formData[fieldName]}
                            onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
                            onBlur={handleSave}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
                            className="bg-gray-50 border-gray-200 h-10 w-full max-w-sm rounded-lg px-3 focus:ring-2 focus:ring-[#0B1528] focus:bg-white text-sm font-bold text-[#0B1528] outline-none"
                        />
                    ) : (
                        <div
                            className="text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 flex items-center gap-3 px-3 py-2 rounded-lg -ml-3 transition-colors group w-full"
                            onClick={() => setEditingField(fieldName)}
                        >
                            <span className="flex-1">{formData[fieldName] || "—"}</span>
                            <Pencil className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100" />
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full">
                    <UserCircle2 className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#0B1528] tracking-tight">Mis Datos de Usuario</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Información Personal</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Haz clic en cualquier campo para editarlo. Se guardará automáticamente.
                    </p>
                </div>
                <div className="px-6 py-2">
                    <EditField label="Nombre" fieldName="firstName" />
                    <EditField label="Primer Apellido" fieldName="lastName1" />
                    <EditField label="Segundo Apellido" fieldName="lastName2" />
                    <EditField label="Correo Electrónico" fieldName="email" />
                </div>
            </div>
        </div>
    )
}
