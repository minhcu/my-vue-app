import { SprintCollapsible } from "@/components/app/BackLog/SprintCollapsible";
import { StoryCollapsible } from "@/components/app/BackLog/StoryCollapsible";
import { BackLogTask } from "@/components/app/BackLog/BackLogTask";
import { BackLogStateContext } from "./BackLogContextProvider";
import { useContext } from "react";

export function BackLogBody() {
    const {
        sprints
    } = useContext(BackLogStateContext);

    return (
        <div className="flex-1 overflow-auto p-6 space-y-6">
            {sprints.map((sprint) => (
                <SprintCollapsible key={sprint.id} sprint={sprint}>
                    <StoryCollapsible>
                        <BackLogTask />
                    </StoryCollapsible>
                </SprintCollapsible>
            ))}
        </div>
    )
}