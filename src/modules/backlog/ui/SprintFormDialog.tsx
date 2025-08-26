import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogClose, DialogTitle, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconPlus } from "@tabler/icons-react"
import { sprintFormSchema } from "../model/sprint"
import { Textarea } from "@/components/ui/textarea"

export function SprintFormDiaLog({ onSuccess }: {
    onSuccess: (formData: z.infer<typeof sprintFormSchema>) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof sprintFormSchema>>({
        resolver: zodResolver(sprintFormSchema),
        defaultValues: {
            name: "",
            goal: "",
            startDate: '',
            endDate: '',
        },
    })

    const onSubmit = useCallback((formData: z.infer<typeof sprintFormSchema>) => {
        form.reset()
        setIsOpen(false)
        onSuccess(formData)
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-2">
                    <IconPlus />
                    <span className="text-sm">Create sprint</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Sprint</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem className="mb-8">
                                <FormLabel>Sprint Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter sprint name" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="goal" render={({ field }) => (
                            <FormItem className="mb-8">
                                <FormLabel>Sprint Goal</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="What do you want to achieve in this sprint?" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="startDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="endDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
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