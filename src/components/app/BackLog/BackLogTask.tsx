import { IconGripVertical } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

export function BackLogTask() {
    return (
        <Card className="ml-4 hover:shadow-sm transition-shadow cursor-pointer group relative bg-muted/20" draggable>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                <IconGripVertical className="h-3 w-3 text-muted-foreground" />
            </div>
            <CardContent className="p-3 pl-6">
                <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">
                        Implement JWT authentication
                    </h5>
                    <p className="text-xs text-muted-foreground line-clamp-1">Add JWT token-based authentication system</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default">high</Badge>
                        <span className="text-xs text-muted-foreground">John Doe</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}