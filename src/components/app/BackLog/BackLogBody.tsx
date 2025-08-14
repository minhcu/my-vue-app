import { SprintCollapsible } from "@/components/app/BackLog/SprintCollapsible";
import { StoryCollapsible } from "@/components/app/BackLog/StoryCollapsible";
import { BackLogTask } from "@/components/app/BackLog/BackLogTask";
import { BackLogStateContext } from "./BackLogContextProvider";
import { useContext } from "react";

export function BackLogBody() {
    const {
        searchQuery, // This can be used for filtering tasks if needed
    } = useContext(BackLogStateContext);

    console.log("BackLogBody re-render when searchQuery changes:", searchQuery);

    return (
        <div className="flex-1 overflow-auto p-6 space-y-6">
            <SprintCollapsible>
                <StoryCollapsible>
                    <BackLogTask />
                </StoryCollapsible>
            </SprintCollapsible>

            <SprintCollapsible>
                <StoryCollapsible>
                    <BackLogTask />
                </StoryCollapsible>
            </SprintCollapsible>

            <SprintCollapsible>
                <StoryCollapsible>
                    <BackLogTask />
                </StoryCollapsible>
            </SprintCollapsible>
        </div>
    )
}