import { type CSSProperties, useState } from "react";
import { PaginationControl } from "../mol.pagination/pagination-control.component";

const GAP_PX = 8;

interface ImageCarouselProps {
  images: string[];
  pageSize?: number;
}

export function ImageCarousel({ images = [], pageSize = 4 }: ImageCarouselProps) {
  const [page, setPage] = useState(0);

  const visibleCount = pageSize > 0 ? pageSize : 4;
  const scrollStep = Math.max(1, Math.floor(visibleCount));
  const totalPages = images.length === 0 ? 0 : Math.max(1, Math.ceil(images.length / scrollStep));
  const currentPage = totalPages > 0 ? Math.min(page, totalPages - 1) : 0;
  const firstVisibleIndex = currentPage * scrollStep;

  const items =
    images.length > 0
      ? images.map((src, index) => ({ id: `carousel-image-${index}`, src }))
      : Array.from({ length: Math.ceil(visibleCount) }, (_, index) => ({
          id: `carousel-placeholder-${index}`,
          src: null as string | null,
        }));

  const viewportStyle = {
    "--visible-count": visibleCount,
    "--gap": `${GAP_PX}px`,
    "--slot-width":
      "calc((100cqw - (var(--visible-count) - 1) * var(--gap)) / var(--visible-count))",
    "--start-index": firstVisibleIndex,
  } as CSSProperties;

  return (
    <div className="flex flex-col gap-md">
      <div className="@container w-full overflow-hidden" style={viewportStyle}>
        <div
          className="flex gap-xs transition-transform duration-300 ease-out"
          style={{
            transform:
              totalPages > 1
                ? "translateX(calc(-1 * var(--start-index) * (var(--slot-width) + var(--gap))))"
                : undefined,
          }}
        >
          {items.map(({ id, src }) => (
            <CarouselSlot key={id} src={src ?? undefined} />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <PaginationControl
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={(nextPage) => setPage(nextPage - 1)}
        />
      )}
    </div>
  );
}

function CarouselSlot({ src }: { src?: string }) {
  const slotStyle = { width: "var(--slot-width)" };

  if (!src) {
    return (
      <div className="aspect-[3/2] shrink-0 rounded-medium bg-grayscale-light" style={slotStyle} />
    );
  }
  return (
    <div className="aspect-[3/2] shrink-0 overflow-hidden rounded-medium" style={slotStyle}>
      <img src={src} alt="Imagem do serviço" className="h-full w-full object-cover" />
    </div>
  );
}
