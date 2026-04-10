export function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-10 text-sm text-slate-400">
      <div className="mr-3 h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      {label}
    </div>
  );
}
