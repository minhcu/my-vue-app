import { useContext, useEffect, useState } from "react"
import { z } from "zod"

import { Dialog, DialogClose, DialogTitle, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import { storyFormSchema } from "../model/sprint"
import { BackLogStateContext } from "../shared/backlog-context"
import { FormField } from "../shared/FormField"
import { storyFormStore } from "../shared/story-form-store"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"

export function StoryFormDefault({ onSuccess }: {
    onSuccess: (formData: z.infer<typeof storyFormSchema>) => void;
}) {
    const { sprintsData } = useContext(BackLogStateContext);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        storyFormStore.setInitalValues({
            title: '',
            description: '',
            criteria: '',
            priority: 'Medium',
            point: 1,
            owner: '',
            sprintId: '',
            tags: []
        });
    }, [])

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
                <form className="space-y-6">
                    <FormField name="title" label="Title" />
                    <FormField name="description" label="Description" />
                    <FormField name="criteria" label="Acceptance Criteria" />
                    <FormField name="priority" label="Priority" render={() => (
                        <Select
                            value={storyFormStore.getSnapshot().priority}
                            onValueChange={(value) => storyFormStore.setFormField('priority', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </form>
                <DialogFooter>
                    <Button onClick={() => storyFormStore.resetForm()} variant="outline">
                        Clear value
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit">
                        Create Sprint
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}