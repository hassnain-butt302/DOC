import { useState } from "react";
import { closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import SortableBlock from "./Types/SortableBlock";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import AddBlockMenu from "./components/Editors/AddBlockMenu";
import Paragraph from "./components/Blocks/Paragraph";
import RadioCard from "./components/Blocks/CheckBox";
import Signature from "./components/Blocks/signature";
import ShortText from "./components/Blocks/ShortText";
import LargeText from "./components/Blocks/LargeText";
import DropdownBlock from "./components/Blocks/DropDownBlock";
import type { Block, BlockType } from "./Types/Blocks";
import Preview from "./Types/Preview";

function App() {
  const [blocks, setBlocks] = useState<Block[]>(() => {
    const savedBlocks = localStorage.getItem("notepad-blocks");
    return savedBlocks ? JSON.parse(savedBlocks) : [];
  });

  const saveBlocks = () => {
    localStorage.setItem("notepad-blocks", JSON.stringify(blocks));
    alert("Document saved successfully!");
  };

  const addBlock = (type: string) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type: type as BlockType,
    };

    setBlocks((prev) => [...prev, newBlock]);
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const updateBlock = (id: string, data: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, ...data } : block
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setBlocks((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      );

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "text":
        return (
          <Paragraph
            onDelete={() => deleteBlock(block.id)}
            onChange={(content) =>
              updateBlock(block.id, { content })
            }
            onSave={saveBlocks}
            content={
              typeof block.content === "string"
                ? block.content
                : ""
            }
          />
        );

      case "shortText":
        return (
          <ShortText
            onDelete={() => deleteBlock(block.id)}
            onChange={(content) =>
              updateBlock(block.id, { content })
            }
            onSave={saveBlocks}
            content={
              typeof block.content === "string"
                ? block.content
                : ""
            }
          />
        );

      case "largeText":
        return (
          <LargeText
            onDelete={() => deleteBlock(block.id)}
            onChange={(content) =>
              updateBlock(block.id, { content })
            }
            onSave={saveBlocks}
            content={
              typeof block.content === "string"
                ? block.content
                : ""
            }
          />
        );

      case "radio":
        return (
          <RadioCard
            onDelete={() => deleteBlock(block.id)}
            onChange={(content) =>
              updateBlock(block.id, {
                options: content.options,
                selectedOption: content.selectedOption,
              })
            }
            onSave={saveBlocks}
            content={{
              options: block.options || [],
              selectedOption: block.selectedOption || "",
            }}
          />
        );

      case "dropdown":
        return (
          <DropdownBlock
            onDelete={() => deleteBlock(block.id)}
            onChange={(content) =>
              updateBlock(block.id, {
                options: content.options,
                selectedOption: content.selectedOption,
              })
            }
            onSave={saveBlocks}
            content={{
              options: block.options || [],
              selectedOption: block.selectedOption || "",
            }}
          />
        );

      case "Signature":
        return (
          <Signature
            onDelete={() => deleteBlock(block.id)}
            onChange={(signature) =>
              updateBlock(block.id, { signature })
            }
            onSave={saveBlocks}
            content={
              typeof block.signature === "string"
                ? block.signature
                : ""
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <nav className="flex h-16 items-center justify-between bg-white px-8 shadow">
        <h1 className="text-2xl font-bold">Notepad</h1>
      </nav>

      <main className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6">
              <AddBlockMenu onSelect={addBlock} />
            </div>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map((block) => block.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-4">
                  {blocks.map((block) => (
                    <SortableBlock
                      key={block.id}
                      id={block.id}
                    >
                      {renderBlock(block)}
                    </SortableBlock>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <div className="min-w-0">
            <Preview blocks={blocks} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;