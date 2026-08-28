import { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

interface ShortTextProps {
  onDelete: () => void;
  onChange: (content: string) => void;
  onSave: () => void;
  content?: string;
}

const ShortText = ({ onDelete, onChange, onSave, content }: ShortTextProps) => {
  const [value, setValue] = useState(content || "");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setValue(content || "");
  }, [content]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".short-text-block")) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="short-text-block flex w-full"
      onClick={() => setSelected(true)}
    >
      <div className="w-1/2">
        <div
          className={`rounded-2xl bg-white p-4 shadow-2xl ${
            selected
              ? "border-2 border-blue-500"
              : "border border-gray-300"
          }`}
        >
          <div className="mb-3 border-b pb-2 font-serif">
            Short Text
          </div>

          <Input
            placeholder="Enter short text"
            value={value}
            maxLength={50}
            showCount
            onChange={(e) => setValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {selected && (
        <div
          className="absolute left-full top-0 ml-4 w-64 rounded-lg bg-white p-5 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-lg font-semibold">
            Short Text Properties
          </h2>

          <button
            type="button"
            onClick={() => {
              onChange(value);
              onSave();
            }}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <SaveOutlined />
            Save Short Text
          </button>

          <Button
            danger
            className="w-full"
            onClick={onDelete}
          >
            <DeleteOutlined />
            Delete Short Text
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShortText;