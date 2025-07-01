export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-blue-200 text-lg font-medium">Loading events...</p>
    </div>
  )
}