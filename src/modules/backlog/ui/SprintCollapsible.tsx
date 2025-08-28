import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconBook, IconCalendar, IconChevronDown, IconChevronRight, IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import type { Sprint } from "@/shared/api.shared"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useContext, useMemo } from "react"
import { BackLogStateContext } from "../shared/backlog-context"
import { StoryCollapsible } from "./StoryCollapsible"

export function SprintCollapsible({
    children,
    sprint,
    onDelete,
}: {
    children?: React.ReactNode,
    sprint: Sprint
    onDelete: (id: string) => void
}) {
    const { storiesData } = useContext(BackLogStateContext);
    const stories = useMemo(() => {
        return storiesData.get(sprint.id) || [];
    }, [storiesData, sprint.id]);

    return (
        <Collapsible>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                    <CollapsibleTrigger asChild className="data-[state=open]:[&_.open-icon]:hidden data-[state=closed]:[&_.close-icon]:hidden">
                        <Button variant="ghost">
                            <IconChevronRight className="open-icon" />
                            <IconChevronDown className="close-icon" />
                        </Button>
                    </CollapsibleTrigger>

                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{sprint.name}</h3>
                            <Badge variant="default">{sprint.status || 'planning'}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                                <IconCalendar className="h-3 w-3" /> {sprint.startDate} - {sprint.endDate}
                            </div>
                            <div className="flex items-center gap-1">
                                <IconBook className="h-3 w-3" /> 5 stories
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button>
                        <IconChevronRight />
                        Start Sprint
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <IconDots className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <IconEdit className="mr-2" />
                                    Edit Sprint
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onClick={() => {
                                    onDelete(sprint.id)
                                }}>
                                    <IconTrash className="mr-2 text-inherit" />
                                    Delete Sprint
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <CollapsibleContent>
                {children || (
                    <div className="text-muted-foreground text-sm">
                        No stories in this sprint yet.
                    </div>
                )}
            </CollapsibleContent>
        </Collapsible>
    )
}