import { useContext } from "react";
import $api from "@/shared/api.shared";

import { BackLogDispatchContext, BackLogStateContext } from "../shared/backlog-context";
import { SprintCollapsible } from "./SprintCollapsible";
import { StoryCollapsible } from "./StoryCollapsible";

export function BackLogBody() {
    const { sprints } = useContext(BackLogStateContext);
    const dispatch = useContext(BackLogDispatchContext);

    async function handleDeleteSprint(sprintId: string) {
        await $api.sprint.deleteSprint(sprintId);
        const sprints = await $api.sprint.getSprints();
        dispatch({ type: "SET_SPRINTS", payload: sprints });
    }

    return (
        <div className="flex-1 overflow-auto p-6 space-y-6">
            {sprints.map((sprint) => (
                <SprintCollapsible key={sprint.id} sprint={sprint} onDelete={handleDeleteSprint}>
                    <div className="grid gap-4 pl-12 min-h-[100px] p-4 rounded-lg border-2 border-dashed transition-colors border-transparent">
                        {sprint.stories.length > 0 && (
                            sprint.stories.map((story) => (
                                <StoryCollapsible key={story.id} story={story}></StoryCollapsible>
                            ))
                        )}
                    </div>
                </SprintCollapsible>
            ))}
        </div>
    )
}