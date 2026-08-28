import { useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import {
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

interface ParagraphProps {

  onDelete: () => void;

  onChange: (
    content: string
  ) => void;

  onSave: () => void;

  content: string;
}

const Paragraph = ({
  onDelete,
  onChange,
  onSave,
  content,
}: ParagraphProps) => {

  const [selected, setSelected] =
    useState(false);


  // =========================
  // Tiptap Editor
  // =========================

  const editor = useEditor({

    extensions: [
      StarterKit,
    ],

    content: content || "<p></p>",

  });


  // =========================
  // Load Saved Content
  // =========================

  useEffect(() => {

    if (
      editor &&
      content !== editor.getHTML()
    ) {

      editor.commands.setContent(
        content || "<p></p>"
      );

    }

  }, [content, editor]);


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
          ".paragraph-block"
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


  if (!editor) {
    return null;
  }


  return (

    <div
      className="paragraph-block relative flex w-full gap-8"
      onClick={() =>
        setSelected(true)
      }
    >

      {/* ========================= */}
      {/* Paragraph */}
      {/* ========================= */}

      <div className="w-1/2">

        <div
          className={`min-h-50 rounded-2xl bg-white p-3 shadow-2xl ${
            selected
              ? "border-2 border-blue-500"
              : "border border-gray-300"
          }`}
        >

          <div className="border-b font-serif">
            Paragraph
          </div>


          <EditorContent
            editor={editor}
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
            Paragraph Properties
          </h2>


          {/* ========================= */}
          {/* Bold */}
          {/* ========================= */}

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`mb-2 flex w-full items-center justify-between rounded border p-2 ${
              editor.isActive("bold")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >

            <span>
              Bold
            </span>

            <b>
              B
            </b>

          </button>


          {/* ========================= */}
          {/* Italic */}
          {/* ========================= */}

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`mb-2 flex w-full items-center justify-between rounded border p-2 ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >

            <span>
              Italic
            </span>

            <i>
              I
            </i>

          </button>


          {/* ========================= */}
          {/* Underline */}
          {/* ========================= */}

          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className={`mb-2 flex w-full items-center justify-between rounded border p-2 ${
              editor.isActive("underline")
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >

            <span>
              Underline
            </span>

            <u>
              U
            </u>

          </button>


          {/* ========================= */}
          {/* Save */}
          {/* ========================= */}

          <button
            type="button"
            onClick={() => {
              onChange(editor.getHTML());
              onSave();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >

            <SaveOutlined />

            Save Paragraph

          </button>


          {/* ========================= */}
          {/* Delete */}
          {/* ========================= */}

          <button
            type="button"
            onClick={onDelete}
            className="mt-2 flex w-full items-center gap-2 rounded border border-red-300 p-2 text-red-500 hover:bg-red-50"
          >

            <DeleteOutlined />

            Delete Paragraph

          </button>

        </div>

      )}

    </div>

  );

};

export default Paragraph;