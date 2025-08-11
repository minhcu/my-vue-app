import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconBook, IconCalendar, IconCaretRight, IconDots } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

export function BackLog() {
    return (
        <>
            <Collapsible>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                        <CollapsibleTrigger>
                            <Button variant="ghost">
                                <IconCaretRight className="mr-2 h-4 w-4" />
                            </Button>
                        </CollapsibleTrigger>

                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold">Sprint 1 - Authentication & Dashboard</h3>
                                <Badge variant="default">Badge</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                    <IconCalendar className="h-3 w-3" /> 2/1/2024 - 2/1/2024
                                </div>
                                <div className="flex items-center gap-1">
                                    <IconBook className="h-3 w-3" /> 5 stories
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button>
                            <IconCaretRight />
                            Start Sprint
                        </Button>
                        <Button variant="ghost">
                            <IconDots className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}