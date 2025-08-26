import { useCallback, useContext, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogClose, DialogTitle, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconPlus, IconX } from "@tabler/icons-react"
import { taskFormSchema } from "../model/sprint"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackLogStateContext } from "../shared/backlog-context"

export function TaskFormDialog({ onSuccess }: {
    onSuccess: (formData: z.infer<typeof taskFormSchema>) => void;
}) {
    const { sprintsData } = useContext(BackLogStateContext);
    const [isOpen, setIsOpen] = useState(false);
    const formInput = useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: "",
            description: "",
            priorityId: "medium",
            assignee: "",
            sprint: "no sprint",
            story: "",
            dueDate: "",
            tags: [],
        },
    })

    const onSubmit = useCallback((formData: z.infer<typeof taskFormSchema>) => {
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
                <Button variant="outline" className="mt-2">
                    <IconPlus />
                    <span className="text-sm">Add task</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter task title..." {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter task description..." {...field} />
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
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="assignee" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assignee</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assignee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mock 1">Mock 1</SelectItem>
                                                <SelectItem value="mock 2">Mock 2</SelectItem>
                                                <SelectItem value="mock 3">Mock 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="sprint" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sprint</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sprint" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="no sprint">No Sprint</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="story" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Story</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select story" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="no sprint">No Sprint</SelectItem>
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

                        <FormField control={form.control} name="dueDate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

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