import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStore } from "./store";

export function CustomFormField({ name, label }: {
    name: string,
    label?: string,
}) {

    const { getState, setState } = createStore(1);

    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} id={name} value={getState()} onChange={(e) => setState(e.target.value)} />
        </div>
    )
}