import { useCallback, useContext } from "react"
import type z from "zod"
import $api from "@/shared/api.shared"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconFilter } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { BackLogDispatchContext } from "../shared/backlog-context"
import { SprintFormDiaLog } from "./SprintFormDialog"
import type { sprintFormSchema, storyFormSchema, taskFormSchema } from "../model/sprint"
import { TaskFormDialog } from "./TaskFormDialog"
import { StoryFormDialog } from "./StoryFormDialog"
import { StoryFormDefault } from "./StoryFormDefault"


export function BackLogHeader() {
    const filterDispatchContext = useContext(BackLogDispatchContext);
    const handleSprintDialog = useCallback(async (formData: z.infer<typeof sprintFormSchema>) => {
        await $api.sprint.createSprint(formData)

        const sprints = await $api.sprint.getSprints()
        filterDispatchContext({ type: 'SET_SPRINTS', payload: sprints });
    }, [])

    const handleTaskDialog = useCallback(async (formData: z.infer<typeof taskFormSchema>) => {
        alert(JSON.stringify(formData))
    }, [])

    const handleStoryDialog = useCallback(async (formData: z.infer<typeof storyFormSchema>) => {
        await $api.userStory.createStory(formData)
        
        // const sprints = await $api.sprint.getSprints()
        // filterDispatchContext({ type: 'SET_SPRINTS', payload: sprints });
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
                        <SprintFormDiaLog onSuccess={handleSprintDialog} />

                        <TaskFormDialog onSuccess={handleTaskDialog} />

                        {/* <StoryFormDialog onSuccess={handleStoryDialog} /> */}
                        
                        <StoryFormDefault onSuccess={handleStoryDialog} />
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
