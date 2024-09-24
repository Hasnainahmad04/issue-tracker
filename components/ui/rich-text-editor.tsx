'use client';

import type { Editor } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const headingIcons = {
  1: Heading1,
  2: Heading2,
  3: Heading3,
};

const HeadingButton = ({
  level,
  editor,
}: {
  level: 1 | 2 | 3;
  editor: Editor;
}) => {
  const HeadingIcon = headingIcons[level];
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      disabled={!editor.can().chain().focus().toggleHeading({ level }).run()}
      className={editor.isActive('heading', { level }) ? 'bg-gray-500' : ''}
      aria-label={`Toggle Heading ${level}`}
    >
      <HeadingIcon className="size-4" />
    </Button>
  );
};

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px]',
      },
    },
    onUpdate: ({ editor: textContent }) => {
      onChange(textContent.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-lg border shadow-sm">
      <div className="border-b p-2">
        <div className="flex flex-wrap gap-2">
          <HeadingButton level={1} editor={editor} />
          <HeadingButton level={2} editor={editor} />
          <HeadingButton level={3} editor={editor} />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-gray-500' : ''}
            aria-label="Toggle Bold"
          >
            <Bold className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-gray-500' : ''}
            aria-label="Toggle Italic"
          >
            <Italic className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-gray-500' : ''}
            aria-label="Toggle Bullet List"
          >
            <List className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-gray-500' : ''}
            aria-label="Toggle Ordered List"
          >
            <ListOrdered className="size-4" />
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
