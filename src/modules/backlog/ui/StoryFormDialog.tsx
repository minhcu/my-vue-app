import { useCallback, useContext, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogClose, DialogTitle, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconPlus, IconX } from "@tabler/icons-react"
import { sprintPriority, storyFormSchema } from "../model/sprint"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackLogStateContext } from "../shared/backlog-context"

export function StoryFormDialog({ onSuccess }: {
    onSuccess: (formData: z.infer<typeof storyFormSchema>) => void;
}) {
    const { sprintsData } = useContext(BackLogStateContext);
    const [isOpen, setIsOpen] = useState(false);
    const formInput = useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof storyFormSchema>>({
        resolver: zodResolver(storyFormSchema),
        defaultValues: {
            title: "test",
            description: "test",
            priorityId: sprintPriority[1],
            sprintId: null,
            tags: ['test'],
        },
    })

    const onSubmit = useCallback((formData: z.infer<typeof storyFormSchema>) => {
        form.reset()
        setIsOpen(false)
        onSuccess(formData)
    }, [])

    const addTag = useCallback((event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = formInput.current?.value;
        if (value?.trim() === "") return;
        const currentTags = form.getValues("tags") || [];
        if (value) {
            const updatedTags = [...currentTags, value];
            form.setValue("tags", updatedTags);
            formInput.current && (formInput.current.value = "");
        }
    }, [form])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="mt-2">
                    <IconPlus />
                    <span className="text-sm">Add User Story</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New User Story</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>User Story Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter User Story title..." {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>User Story Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter User Story description..." {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="priorityId" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={sprintPriority[0]}>Low</SelectItem>
                                                <SelectItem value={sprintPriority[1]}>Medium</SelectItem>
                                                <SelectItem value={sprintPriority[2]}>High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="point" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Story Points</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(e) => field.onChange(Number(e))}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sprint" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem itemType="number" value="1">1</SelectItem>
                                                <SelectItem itemType="number" value="2">2</SelectItem>
                                                <SelectItem itemType="number" value="3">3</SelectItem>
                                                <SelectItem itemType="number" value="5">5</SelectItem>
                                                <SelectItem itemType="number" value="8">8</SelectItem>
                                                <SelectItem itemType="number" value="13">13</SelectItem>
                                                <SelectItem itemType="number" value="21">21</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="owner" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Owner</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sprint" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Mock Owner 1">Mock Owner 1</SelectItem>
                                                <SelectItem value="Mock Owner 2">Mock Owner 2</SelectItem>
                                                <SelectItem value="Mock Owner 3">Mock Owner 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="sprintId" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Story</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select story" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sprintsData.map((sprint) => (
                                                    <SelectItem key={sprint.id} value={sprint.id}>
                                                        {sprint.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="tags" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <div className="flex gap-2 mb-2">
                                    <FormControl>
                                        <Input placeholder="Enter tags..." ref={formInput} onKeyDown={addTag} />
                                    </FormControl>
                                    <Button variant="outline" onClick={addTag}>
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {field.value ? field.value.map((tag, index) => (
                                        <span key={index} className="flex items-center gap-1 bg-gray-200 rounded-full px-2 py-1 text-sm">
                                            {tag}
                                            <IconX size="12" />
                                        </span>
                                    )) : null}
                                </div>
                            </FormItem>
                        )} />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Create Sprint
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}