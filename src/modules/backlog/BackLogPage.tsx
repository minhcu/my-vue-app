import { BackLogHeader } from "./ui/BackLogHeader";
import { BackLogContextProvider } from "./shared/BackLogContextProvider";
import { BackLogBody } from "./ui/BackLogBody";

export function BackLog() {
    return (
        <BackLogContextProvider>
            <BackLogHeader />
            <BackLogBody />
        </BackLogContextProvider>
    )
}