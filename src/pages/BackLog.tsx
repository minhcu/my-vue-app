import { BackLogHeader } from "@/components/app/BackLog/BackLogHeader";
import { BackLogContextProvider } from "@/components/app/BackLog/BackLogContextProvider";
import { BackLogBody } from "@/components/app/BackLog/BackLogBody";

export function BackLog() {
    return (
        <>
            <BackLogContextProvider>
                <BackLogHeader />

                <BackLogBody />
            </BackLogContextProvider>
        </>
    )
}