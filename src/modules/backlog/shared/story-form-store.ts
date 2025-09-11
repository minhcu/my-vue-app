let formFieldValues: Record<string, any> = {}

let listeners: Array<() => void> = []

export const storyFormStore = {
    setInitalValues: (initialValues: Partial<typeof formFieldValues>) => {
        formFieldValues = { ...formFieldValues, ...initialValues }
        listeners.forEach(listener => listener());
    },

    subscribe: (listener: () => void) => {
        listeners.push(listener);
        return () => listeners = listeners.filter(l => l !== listener);
    },
    getSnapshot: () => formFieldValues,

    setFormField: (field: keyof typeof formFieldValues, value: string) => {
        formFieldValues[field] = value;
        listeners.forEach(listener => listener());
    },
    resetForm: () => {
        Object.keys(formFieldValues).forEach(key => formFieldValues[key] = '');
        listeners.forEach(listener => listener());
    }
}