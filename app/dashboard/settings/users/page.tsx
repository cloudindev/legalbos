"use client"

import { useEffect, useState } from "react"
import { getTenantUsers, addTenantUser } from "./actions"
import { Users, Plus, Mail, Lock, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function SettingsUsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName1: "",
        lastName2: "",
        email: "",
        passwordRaw: ""
    })
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const fetchUsers = async () => {
        setLoading(true)
        const data = await getTenantUsers()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError("")

        try {
            await addTenantUser(formData)
            setIsOpen(false)
            setFormData({
                firstName: "",
                lastName1: "",
                lastName2: "",
                email: "",
                passwordRaw: ""
            })
            fetchUsers()
        } catch (err: any) {
            setError(err.message || "Error al añadir el usuario")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Gestión de Usuarios</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        Administra los miembros de tu equipo y añade nuevos abogados.
                    </p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-full shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-[#0B1528]">Añadir Nuevo Usuario</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            {error && <div className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</div>}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Nombre</label>
                                <Input required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">1º Apellido</label>
                                    <Input required value={formData.lastName1} onChange={e => setFormData({ ...formData, lastName1: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">2º Apellido</label>
                                    <Input value={formData.lastName2} onChange={e => setFormData({ ...formData, lastName2: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <Input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Contraseña temporal</label>
                                <Input type="password" required value={formData.passwordRaw} onChange={e => setFormData({ ...formData, passwordRaw: e.target.value })} />
                            </div>

                            <Button type="submit" disabled={saving} className="w-full bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-11 rounded-full mt-4">
                                {saving ? "Añadiendo..." : "Crear Usuario"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Usuario</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rol</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 text-[#0B1528] flex items-center justify-center font-bold text-sm">
                                            {u.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="font-bold text-sm text-gray-900">{u.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {u.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {u.role === 'ADMIN' ? 'Administrador' : 'Abogado'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
