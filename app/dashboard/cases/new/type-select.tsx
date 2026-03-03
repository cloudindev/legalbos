"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

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
import { createCaseType } from "../actions"

interface TypeSelectProps {
    types: any[]
    selectedId: string
    onChange: (id: string) => void
    onTypeAdded: (newType: any) => void
}

export function TypeSelect({ types, selectedId, onChange, onTypeAdded }: TypeSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [isCreating, setIsCreating] = React.useState(false)

    const handleCreate = async () => {
        if (!searchValue.trim()) return
        setIsCreating(true)
        try {
            const newObj = await createCaseType(searchValue.trim())
            onTypeAdded(newObj)
            onChange(newObj.id)
            setOpen(false)
        } catch (error) {
            console.error("Error creating phase type:", error)
        } finally {
            setIsCreating(false)
            setSearchValue("")
        }
    }

    const selected = types.find((c) => c.id === selectedId)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-11 bg-gray-50/50 hover:bg-white transition-colors"
                >
                    {selected ? selected.name : "Seleccionar tipo (Civil, Penal...)"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Buscar tipo de caso..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList>
                        <CommandEmpty className="py-2 px-4 text-sm">
                            <p className="text-gray-500 mb-2">No se encontró.</p>
                            {searchValue.trim() && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-full justify-start text-xs h-8"
                                    onClick={handleCreate}
                                    disabled={isCreating}
                                >
                                    <Plus className="mr-2 h-3 w-3" />
                                    {isCreating ? "Creando..." : `Crear Jurisdicción/Tipo "${searchValue}"`}
                                </Button>
                            )}
                        </CommandEmpty>
                        <CommandGroup>
                            {types.map((type) => (
                                <CommandItem
                                    key={type.id}
                                    value={type.name}
                                    onSelect={() => {
                                        onChange(type.id)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedId === type.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {type.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
