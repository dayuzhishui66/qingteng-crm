export default function TagChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-600 border border-gray-200">
      {label}
    </span>
  );
}
