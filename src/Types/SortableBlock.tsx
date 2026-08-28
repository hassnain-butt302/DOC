import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableBlockProps = {
  id: string;
  children: React.ReactNode;
};

const SortableBlock = ({
  id,
  children,
}: SortableBlockProps) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute -left-10 top-5 cursor-grab rounded bg-white px-2 py-1 shadow active:cursor-grabbing"
      >
        ⋮⋮
      </button>

      {children}

    </div>
  );
};

export default SortableBlock;