import { Skeleton } from "@/components/ui/skeleton";

// ─── Filter Panel Skeleton ────────────────────────────────────────────────────
function FilterPanelSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <Skeleton className="h-[14px] w-[120px] rounded" />
        <Skeleton className="h-[14px] w-[14px] rounded" />
      </div>
      {/* Rows */}
      <div className="px-5 pb-5 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Skeleton className="h-[15px] w-[15px] rounded-sm shrink-0" />
            <Skeleton className="h-[13px] rounded" style={{ width: `${55 + (i % 3) * 20}px` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Product Card Skeleton ────────────────────────────────────────────────────
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Image area */}
      <Skeleton className="w-full aspect-square" />
      {/* Info */}
      <div className="p-3.5 flex flex-col gap-2.5">
        <Skeleton className="h-[13px] w-full rounded" />
        <Skeleton className="h-[13px] w-3/4 rounded" />
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-[15px] w-[60px] rounded" />
          <Skeleton className="h-[12px] w-[45px] rounded" />
        </div>
        <Skeleton className="h-[36px] w-full rounded-[7px] mt-1" />
      </div>
    </div>
  );
}

// ─── Loading Page ─────────────────────────────────────────────────────────────
export default function CategoryLoading() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-[28px] w-[160px] rounded" />
        <div className="hidden sm:flex items-center gap-2">
          <Skeleton className="h-[13px] w-[35px] rounded" />
          <Skeleton className="h-[13px] w-[8px] rounded" />
          <Skeleton className="h-[13px] w-[80px] rounded" />
        </div>
      </div>

      {/* ── Sort / Filter Bar ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-[10px] border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[13px] w-[50px] rounded" />
          <Skeleton className="h-[34px] w-[140px] rounded-[6px]" />
          <Skeleton className="h-[34px] w-[90px] rounded-[6px] lg:hidden" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-[13px] w-[70px] rounded hidden sm:block" />
          <Skeleton className="h-[34px] w-[100px] rounded-[6px]" />
        </div>
      </div>

      {/* ── Main Layout ──────────────────────────────────────────── */}
      <div className="flex gap-5">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-3 w-[200px] shrink-0">
          <FilterPanelSkeleton rows={5} />
          {/* Price Panel */}
          <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <Skeleton className="h-[14px] w-[50px] rounded" />
              <Skeleton className="h-[14px] w-[14px] rounded" />
            </div>
            <div className="px-5 pb-5 flex items-center gap-2">
              <Skeleton className="h-[36px] flex-1 rounded-[6px]" />
              <Skeleton className="h-[13px] w-[10px] rounded shrink-0" />
              <Skeleton className="h-[36px] flex-1 rounded-[6px]" />
              <Skeleton className="h-[36px] w-[36px] rounded-[6px] shrink-0" />
            </div>
          </div>
          <FilterPanelSkeleton rows={6} />
          <FilterPanelSkeleton rows={1} />
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
