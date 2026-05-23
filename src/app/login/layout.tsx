export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Override the pb-[56px] from the root layout to remove bottom nav padding
    <div className="flex-1 flex flex-col min-h-screen bg-[var(--c-base)] -mb-[56px]">
      {children}
    </div>
  );
}
