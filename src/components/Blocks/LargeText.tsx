import { useEffect, useState } from "react";
import { Input, Button } from "antd";
import {
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

interface LargeTextProps {
  onDelete: () => void;

  onChange: (content: string) => void;

  onSave: () => void;

  content?: string;
}

const LargeText = ({
  onDelete,
  onChange,
  onSave,
  content,
}: LargeTextProps) => {

  // =========================
  // State
  // =========================

  const [value, setValue] =
    useState(content || "");

  const [selected, setSelected] =
    useState(false);


  // =========================
  // Load Saved Content
  // =========================

  useEffect(() => {

    setValue(content || "");

  }, [content]);


  // =========================
  // Change Text
  // =========================

  const handleChange = (
    value: string
  ) => {

    setValue(value);

  };


  // =========================
  // Click Outside
  // =========================

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      const target =
        event.target as HTMLElement;

      if (
        !target.closest(
          ".large-text-block"
        )
      ) {

        setSelected(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================
  // UI
  // =========================

  return (

    <div
      className="large-text-block relative flex w-full"
      onClick={() =>
        setSelected(true)
      }
    >

      {/* ========================= */}
      {/* Large Text */}
      {/* ========================= */}

      <div className="w-1/2">

        <div
          className={`rounded-2xl bg-white p-4 shadow-2xl ${
            selected
              ? "border-2 border-blue-500"
              : "border border-gray-300"
          }`}
        >

          <div className="mb-3 border-b pb-2 font-serif">
            Large Text
          </div>

          <Input.TextArea
            placeholder="Enter large text"

            value={value}

            onChange={(e) =>
              handleChange(
                e.target.value
              )
            }

            onClick={(e) =>
              e.stopPropagation()
            }

            rows={8}

            showCount

            maxLength={1000}

          />

        </div>

      </div>


      {/* ========================= */}
      {/* Properties */}
      {/* ========================= */}

      {selected && (

        <div
          className="absolute left-full top-0 ml-4 w-64 rounded-lg bg-white p-5 shadow-lg"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <h2 className="mb-4 text-lg font-semibold">
            Large Text Properties
          </h2>


          {/* ========================= */}
          {/* Save */}
          {/* ========================= */}

          <button
            type="button"
            onClick={() => {
              onChange(value);
              onSave();
            }}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >

            <SaveOutlined />

            Save Large Text

          </button>


          {/* ========================= */}
          {/* Delete */}
          {/* ========================= */}

          <Button
            danger
            className="w-full"
            onClick={onDelete}
          >

            <DeleteOutlined />

            Delete Large Text

          </Button>

        </div>

      )}

    </div>

  );

};

export default LargeText;