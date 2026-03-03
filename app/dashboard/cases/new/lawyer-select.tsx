"use client"

import * as React from "react"
import { Check, ChevronsUpDown, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"

interface LawyerSelectProps {
    contacts: any[]
    selectedId: string | null
    onChange: (id: string | null) => void
}

export function LawyerSelect({ contacts, selectedId, onChange }: LawyerSelectProps) {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    const selected = contacts.find((c) => c.id === selectedId)

    return (
        <div className="flex gap-2 w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="flex-1 justify-between h-11 bg-gray-50/50 hover:bg-white transition-colors"
                    >
                        {selected ? (selected.type === "COMPANY" ? selected.companyName : `${selected.firstName} ${selected.lastName || ""}`.trim()) : "Buscar en Directorio..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Buscar por nombre..." />
                        <CommandList>
                            <CommandEmpty className="py-3 px-4 text-center">
                                <p className="text-sm text-gray-500">No encontrado en la agenda.</p>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="mt-2 text-indigo-600 h-auto p-0"
                                    onClick={() => router.push('/dashboard/directory/new')}
                                >
                                    Ir al Directorio a añadirlo
                                </Button>
                            </CommandEmpty>
                            <CommandGroup>
                                {/* Option to unselect */}
                                <CommandItem onSelect={() => { onChange(null); setOpen(false) }}>
                                    <span className="text-gray-400 italic">Ninguno / Quitar selección</span>
                                </CommandItem>
                                {contacts.map((contact) => {
                                    const name = contact.type === "COMPANY" ? contact.companyName : `${contact.firstName} ${contact.lastName || ""}`.trim()
                                    return (
                                        <CommandItem
                                            key={contact.id}
                                            value={name}
                                            onSelect={() => {
                                                onChange(contact.id)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedId === contact.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <div className="flex flex-col">
                                                <span>{name}</span>
                                                {contact.category && <span className="text-[10px] uppercase text-gray-400">{contact.category.name}</span>}
                                            </div>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
