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
import { createContactCategory } from "../actions"

interface CategorySelectProps {
    categories: any[]
    selectedId: string
    onChange: (id: string) => void
    onCategoryAdded: (newCategory: any) => void
}

export function CategorySelect({ categories, selectedId, onChange, onCategoryAdded }: CategorySelectProps) {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [isCreating, setIsCreating] = React.useState(false)

    const handleCreateCategory = async () => {
        if (!searchValue.trim()) return
        setIsCreating(true)
        try {
            const newCat = await createContactCategory(searchValue.trim())
            onCategoryAdded(newCat)
            onChange(newCat.id)
            setOpen(false)
        } catch (error) {
            console.error("Error creating category:", error)
        } finally {
            setIsCreating(false)
            setSearchValue("")
        }
    }

    const selectedCategory = categories.find((c) => c.id === selectedId)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-11 bg-gray-50/50 hover:bg-white transition-colors"
                >
                    {selectedCategory ? selectedCategory.name : "Seleccionar categoría..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Buscar categoría..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList>
                        <CommandEmpty className="py-2 px-4 text-sm">
                            <p className="text-gray-500 mb-2">No se encontró la categoría.</p>
                            {searchValue.trim() && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-full justify-start text-xs h-8"
                                    onClick={handleCreateCategory}
                                    disabled={isCreating}
                                >
                                    <Plus className="mr-2 h-3 w-3" />
                                    {isCreating ? "Creando..." : `Crear "${searchValue}"`}
                                </Button>
                            )}
                        </CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => {
                                        onChange(category.id)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedId === category.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {category.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
