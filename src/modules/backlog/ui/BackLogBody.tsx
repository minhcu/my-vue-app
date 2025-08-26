import { useContext } from "react";
import $api from "@/shared/api.shared";

import { BackLogDispatchContext, BackLogStateContext } from "../shared/backlog-context";
import { SprintCollapsible } from "./SprintCollapsible";
import { StoryCollapsible } from "./StoryCollapsible";
import { BackLogTask } from "./BackLogTask";

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
                    <StoryCollapsible>
                        <BackLogTask />
                    </StoryCollapsible>
                </SprintCollapsible>
            ))}
        </div>
    )
}