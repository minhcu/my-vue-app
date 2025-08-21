import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconBook, IconChevronRight, IconCurling, IconDots, IconDotsVertical } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

export function StoryCollapsible({
    children,
}: {
    children?: React.ReactNode
}) {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer group relative border-l-4 border-l-primary-500">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                <IconDotsVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <Collapsible>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <IconBook className="h-4 w-4 text-primary-600" />
                                <Badge variant="default">Story</Badge>
                                <Badge variant="outline">5 pts</Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                                As a user, I want to log into the system so that I can access my dashboard
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                                Users need a secure way to authenticate and access their personalized dashboard
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>2</span>
                                <span>task</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CollapsibleTrigger asChild>
                                <Button className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" variant="ghost">
                                    <IconChevronRight className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <Button className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" variant="ghost">
                                <IconDots className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">authentication</Badge>
                            <Badge variant="outline">security</Badge>
                        </div>
                    </div>
                    <CollapsibleContent>
                        <div className="mt-4 space-y-2 border-t pt-4">
                            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                <IconCurling className="h-3 w-3" />
                                Tasks (2)
                            </h4>
                            {children || (
                                <div className="text-muted-foreground text-sm">
                                    No tasks in this story yet.
                                </div>
                            )}
                        </div>
                    </CollapsibleContent>
                </CardContent>
            </Collapsible>
        </Card>
    )
}