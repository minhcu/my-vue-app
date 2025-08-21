import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconFilter, IconPlus } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCallback, useContext, useState } from "react"
import { BackLogDispatchContext } from "./BackLogContextProvider"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import $api from "@/shared/api.shared"
import { DialogTitle } from "@radix-ui/react-dialog"

const sprintFormSchema = z.object({
    name: z.string().min(1, "Sprint name is required"),
    goal: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
});

const SprintFormDiaLog = ({ onSuccess }: {
    onSuccess: () => void;
}) => {
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

    const onSubmit = useCallback(async (formData: z.infer<typeof sprintFormSchema>) => {
        await $api.sprint.createSprint(formData)
        form.reset()
        setIsOpen(false)
        onSuccess()
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
                            <FormItem>
                                <FormLabel>Sprint Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter sprint name" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="goal" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sprint Goal</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter sprint goal" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

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

export function BackLogHeader() {
    const filterDispatchContext = useContext(BackLogDispatchContext);
    const fetchSprints = useCallback(async () => {
        const sprints = await $api.sprint.getSprints()
        filterDispatchContext({ type: 'SET_SPRINTS', payload: sprints });
    }, [])
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="w-full p-6 border-b bg-background">
                <div className="flex items-center justify-between mb-4 w-full">
                    <div className="flex items-center gap-3">
                        <SidebarTrigger className="-ml-1" />
                        <div>
                            <h1 className="text-2xl font-bold">Backlog</h1>
                            <p className="text-muted-foreground">Manage user stories, sprints and tasks</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <SprintFormDiaLog onSuccess={fetchSprints} />

                        <Button variant="outline" className="mt-2 ml-2">
                            <IconPlus />
                            <span className="text-sm">Add task</span>
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button color="primary" className="mt-2 ml-2">
                                    <IconPlus />
                                    <span className="text-sm">Add user story</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                test
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Input placeholder="Search user stories..." onChange={(e) => filterDispatchContext({
                            type: 'SET_SEARCH_QUERY',
                            payload: e.target.value
                        })} />
                    </div>

                    <Select defaultValue="all" onValueChange={(value) => filterDispatchContext({
                        type: 'SET_PRIORITY',
                        payload: value
                    })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all" onValueChange={(value) => filterDispatchContext({
                        type: 'SET_ASSIGNEE',
                        payload: value
                    })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Assignee</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline">
                        <IconFilter />
                    </Button>
                </div>
            </div>
        </header>
    )
}
