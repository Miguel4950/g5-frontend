export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl p-5 shadow bg-white border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </div>
  );
}
