"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, UserPlus } from "lucide-react"
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

// This would usually call a server action, mocked for UI demonstration if needed or we pass the prop function
interface ClientSelectProps {
    clients: any[]
    selectedId: string
    onChange: (id: string) => void
    onOpenCreateModal: (defaultName: string) => void
}

export function ClientSelect({ clients, selectedId, onChange, onOpenCreateModal }: ClientSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")

    const selected = clients.find((c) => c.id === selectedId)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-11 bg-gray-50/50 hover:bg-white transition-colors"
                >
                    {selected ? (selected.type === "COMPANY" ? selected.companyName : `${selected.firstName} ${selected.lastName || ""}`.trim()) : "Buscar cliente existente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Escribe el nombre del cliente..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList>
                        <CommandEmpty className="py-3 px-4 text-center">
                            <p className="text-sm text-gray-500 mb-3">No hay clientes con ese nombre.</p>
                            <Button
                                type="button"
                                className="w-full bg-[#0B1528] text-white"
                                onClick={() => {
                                    setOpen(false)
                                    onOpenCreateModal(searchValue)
                                }}
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Crear nuevo cliente
                            </Button>
                        </CommandEmpty>
                        <CommandGroup>
                            {clients.map((client) => {
                                const name = client.type === "COMPANY" ? client.companyName : `${client.firstName} ${client.lastName || ""}`.trim()
                                return (
                                    <CommandItem
                                        key={client.id}
                                        value={name}
                                        onSelect={() => {
                                            onChange(client.id)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedId === client.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {name} <span className="text-xs text-gray-400 ml-2">({client.nifCif || 'Sin NIF'})</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
