"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

// lowlight
import { createLowlight, common } from "lowlight";
import "highlight.js/styles/atom-one-dark.css"; // Note: Adjust style as needed based on theme

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, 
  Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, CheckSquare, Quote, CodeSquare, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon, Highlighter,
  Palette, Maximize, Minimize, Undo, Redo
} from "lucide-react";
import { cn } from "@/lib/utils";

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  storageKey?: string;
}

export function TiptapEditor({ content, onChange, placeholder = "Write something epic...", storageKey = "tiptap-draft" }: TiptapEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We use lowlight
      }),
      Placeholder.configure({ placeholder }),
      Typography,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Color,
      TextStyle,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      
      const text = editor.getText();
      setCharCount(text.length);
      setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
    },
  });

  // Auto-save to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      if (editor) {
        localStorage.setItem(storageKey, editor.getHTML());
      }
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [editor, storageKey]);

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={cn(
      "flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : "min-h-[600px] h-[600px]"
    )}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border/50 bg-secondary/30 sticky top-0 z-10 overflow-y-auto max-h-32">
        
        {/* History */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={<Undo className="h-4 w-4" />} />
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={<Redo className="h-4 w-4" />} />
        </div>

        {/* Text Marks */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<UnderlineIcon className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} icon={<Strikethrough className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} icon={<Code className="h-4 w-4" />} />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon={<Heading1 className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={<Heading2 className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={<Heading3 className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} icon={<Heading4 className="h-4 w-4" />} />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={<AlignLeft className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={<AlignCenter className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={<AlignRight className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} icon={<AlignJustify className="h-4 w-4" />} />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('taskList')} onClick={() => editor.chain().focus().toggleTaskList().run()} icon={<CheckSquare className="h-4 w-4" />} />
        </div>

        {/* Blocks */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} icon={<CodeSquare className="h-4 w-4" />} />
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<Minus className="h-4 w-4" />} />
        </div>

        {/* Inserts & Advanced */}
        <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
          <ToolbarButton active={editor.isActive('link')} onClick={setLink} icon={<LinkIcon className="h-4 w-4" />} />
          <ToolbarButton onClick={addImage} icon={<ImageIcon className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('table')} onClick={addTable} icon={<TableIcon className="h-4 w-4" />} />
          <ToolbarButton active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} icon={<Highlighter className="h-4 w-4" />} />
          <input 
            type="color"
            onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="w-7 h-7 p-0 border-0 cursor-pointer rounded overflow-hidden"
            title="Text Color"
          />
        </div>

        {/* Fullscreen Toggle */}
        <div className="flex items-center gap-1 ml-auto">
          <ToolbarButton 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            icon={isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />} 
          />
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 cursor-text bg-background prose-container">
        <EditorContent editor={editor} className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert prose-lg focus:outline-none" />
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 border-t border-border/50 bg-secondary/20 flex justify-between items-center text-xs text-muted-foreground">
        <div>
          {wordCount} words • {charCount} characters
        </div>
        <div>
          {/* Status indication */}
          Auto-saved to draft
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ 
  icon, 
  onClick, 
  active = false, 
  disabled = false 
}: { 
  icon: React.ReactNode, 
  onClick: () => void, 
  active?: boolean, 
  disabled?: boolean 
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 w-8 rounded",
        active ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
    </Button>
  );
}
