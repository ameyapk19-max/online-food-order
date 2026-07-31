export function VegNonVegLogo({ isVeg = true }: { isVeg?: boolean }) {
  if (isVeg) {
    return (
      <div
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border-[1.5px] border-emerald-600 p-[2px]"
        title="Pure Vegetarian"
      >
        <div className="h-2 w-2 rounded-full bg-emerald-600" />
      </div>
    );
  }

  return (
    <div
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border-[1.5px] border-red-600 p-[2px]"
      title="Non-Vegetarian"
    >
      <div className="h-0 w-0 border-b-[6px] border-l-[3.5px] border-r-[3.5px] border-b-red-600 border-l-transparent border-r-transparent" />
    </div>
  );
}
