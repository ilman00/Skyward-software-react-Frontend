import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Link2,
  List,
  ListOrdered,
} from "lucide-react";

const ToolbarButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}> = ({ onClick, active, label, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`p-2 rounded-lg transition-colors ${
      active
        ? "bg-blue-100 text-blue-700"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    }`}
  >
    {children}
  </button>
);

interface RichTextEditorProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (html: string) => void;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  hint,
  value,
  onChange,
  minHeight = "min-h-[180px]",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `${minHeight} px-4 py-3 focus:outline-none text-gray-700 text-sm leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5`,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync external changes (edit-mode prefill) without clobbering the caret
  // while the user is typing — getHTML() already matches during normal edits.
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
        {editor && (
          <div className="flex items-center gap-1 px-3 py-2 bg-gray-50/50 border-b border-gray-200">
            <ToolbarButton
              label="Bold"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <BoldIcon size={16} />
            </ToolbarButton>
            <ToolbarButton
              label="Italic"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon size={16} />
            </ToolbarButton>
            <ToolbarButton
              label="Bullet list"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={16} />
            </ToolbarButton>
            <ToolbarButton
              label="Numbered list"
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={16} />
            </ToolbarButton>
            <ToolbarButton
              label="Link"
              active={editor.isActive("link")}
              onClick={() => {
                const previousUrl = editor.getAttributes("link").href as
                  | string
                  | undefined;
                const url = window.prompt("URL", previousUrl ?? "https://");
                if (url === null) return;
                if (url === "") {
                  editor.chain().focus().unsetLink().run();
                  return;
                }
                editor.chain().focus().setLink({ href: url }).run();
              }}
            >
              <Link2 size={16} />
            </ToolbarButton>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
      {hint && <p className="text-xs text-gray-400 ml-1">{hint}</p>}
    </div>
  );
};

export default RichTextEditor;