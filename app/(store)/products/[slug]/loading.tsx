import { Skeleton } from "@/components/ui/skeleton";

function RelatedProductSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Skeleton className="w-14 h-14 rounded-[8px] shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-[12px] w-full rounded" />
        <Skeleton className="h-[12px] w-3/4 rounded" />
        <div className="flex gap-1.5 mt-1">
          <Skeleton className="h-[13px] w-[45px] rounded" />
          <Skeleton className="h-[11px] w-[35px] rounded" />
        </div>
      </div>
    </div>
  );
}

export default function ProductLoading() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <Skeleton className="h-[13px] w-[35px] rounded" />
        <Skeleton className="h-[13px] w-[5px] rounded" />
        <Skeleton className="h-[13px] w-[60px] rounded" />
        <Skeleton className="h-[13px] w-[5px] rounded" />
        <Skeleton className="h-[13px] w-[140px] rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Left: Main Card ──────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Image + Info Card */}
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 md:p-7">
            <div className="flex flex-col md:flex-row gap-6">

              {/* Thumbnail strip */}
              <div className="flex flex-row md:flex-col gap-2 md:w-[88px]">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="shrink-0 w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-[8px]" />
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1">
                <Skeleton className="w-full max-w-[380px] mx-auto aspect-square rounded-[12px]" />
              </div>

              {/* Product info */}
              <div className="flex-1 space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-[26px] w-full rounded" />
                  <Skeleton className="h-[26px] w-3/4 rounded" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-[28px] w-[110px] rounded" />
                  <Skeleton className="h-[18px] w-[80px] rounded" />
                  <Skeleton className="h-[22px] w-[60px] rounded-full" />
                </div>

                <Skeleton className="h-px w-full rounded" />

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <Skeleton className="h-[14px] w-[70px] rounded" />
                  <Skeleton className="h-[40px] w-[120px] rounded-[8px]" />
                </div>

                {/* Action buttons 2x2 grid */}
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-[48px] rounded-[8px]" />
                  <Skeleton className="h-[48px] rounded-[8px]" />
                  <Skeleton className="h-[48px] rounded-[8px]" />
                  <Skeleton className="h-[48px] rounded-[8px]" />
                </div>

                {/* Brand */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-[13px] w-[40px] rounded" />
                  <Skeleton className="h-[32px] w-[80px] rounded-[6px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 px-2 gap-1">
              <Skeleton className="h-[52px] w-[110px] rounded-none" />
              <Skeleton className="h-[52px] w-[160px] rounded-none opacity-50" />
            </div>
            <div className="p-6 md:p-8 space-y-3">
              <Skeleton className="h-[14px] w-full rounded" />
              <Skeleton className="h-[14px] w-full rounded" />
              <Skeleton className="h-[14px] w-5/6 rounded" />
              <div className="pt-2 space-y-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                    <Skeleton className="h-[13px] rounded" style={{ width: `${120 + i * 30}px` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Related Products Sidebar ─────────────────── */}
        <div className="w-full lg:w-[240px] shrink-0">
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden sticky top-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
              <Skeleton className="h-[14px] w-[100px] rounded" />
              <div className="flex gap-1">
                <Skeleton className="w-6 h-6 rounded" />
                <Skeleton className="w-6 h-6 rounded" />
              </div>
            </div>

            {/* Related products */}
            <div className="divide-y divide-gray-50">
              {Array.from({ length: 5 }).map((_, i) => (
                <RelatedProductSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
