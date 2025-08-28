export function BlankLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            {children}
        </div>
    );
}