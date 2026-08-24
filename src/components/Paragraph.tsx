
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const paragraph = () => {
     const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
  });

  if (!editor) return null;
  return (
    <div className="">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 border rounded font-bold"
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded italic"
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-3 py-1  border rounded underline hover:text-white bg-blue-300 "
        >
          U
        </button>
      </div>

      <div className="border rounded p-3 min-h-50 w-1/2" >
        <EditorContent editor={editor} />
      </div>
    </div>
   
  )
}

export default paragraph
