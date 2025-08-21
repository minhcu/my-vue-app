import { BackLogHeader } from "@/modules/backlog/BackLogHeader.component";
import { BackLogContextProvider } from "@/modules/backlog/BackLogContextProvider.component";
import { BackLogBody } from "@/modules/backlog/BackLogBody.component";

export function BackLog() {
    return (
        <BackLogContextProvider>
            <BackLogHeader />
            <BackLogBody />
        </BackLogContextProvider>
    )
}