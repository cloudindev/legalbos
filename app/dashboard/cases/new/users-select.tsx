"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
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

interface UsersMultiSelectProps {
    users: any[]
    selectedIds: string[]
    onChange: (ids: string[]) => void
}

export function UsersMultiSelect({ users, selectedIds, onChange }: UsersMultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const toggleUser = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter(v => v !== id))
        } else {
            onChange([...selectedIds, id])
        }
    }

    const removeUser = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        onChange(selectedIds.filter(v => v !== id))
    }

    const selectedUsers = users.filter(u => selectedIds.includes(u.id))

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-auto min-h-[44px] bg-gray-50/50 hover:bg-white transition-colors py-2 px-3"
                >
                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.length > 0 ? (
                            selectedUsers.map(user => (
                                <span key={user.id} className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                    {user.name}
                                    <X
                                        className="ml-1 h-3 w-3 cursor-pointer hover:bg-indigo-200 rounded-full"
                                        onClick={(e) => removeUser(e, user.id)}
                                    />
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 font-normal">Asignar miembros del equipo...</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder="Buscar miembro..." />
                    <CommandList>
                        <CommandEmpty>No hay miembros con ese nombre.</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={user.name}
                                    onSelect={() => toggleUser(user.id)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedIds.includes(user.id) ? "opacity-100 text-indigo-600" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span className={selectedIds.includes(user.id) ? "font-bold text-indigo-900" : ""}>{user.name}</span>
                                        <span className="text-[10px] text-gray-400">{user.role}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
