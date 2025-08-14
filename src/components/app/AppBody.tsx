export function AppBody({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex-1 overflow-auto p-6 space-y-6">
            {children}
        </div>
    )
}