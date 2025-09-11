import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storyFormStore } from "./story-form-store";
import { useSyncExternalStore, type JSX } from "react";

export function FormField({ name, label, render }: {
    name: keyof ReturnType<typeof storyFormStore.getSnapshot>,
    label?: string,
    render?: () => JSX.Element
}) {
    const value = useSyncExternalStore(storyFormStore.subscribe, () => storyFormStore.getSnapshot()[name]);

    console.log('FormField rerender', name, value)
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            {render ? render() : (
                <Input name={name} id={name} value={value} onChange={(e) => storyFormStore.setFormField(name, e.target.value)} />
            )}
        </div>
    )
}