import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FileHandler from '@tiptap/extension-file-handler';
import Image from '@tiptap/extension-image';
import {
  RichTextEditor,
  type RichTextEditorStylesNames,
} from '@mantine/tiptap';
import { useEffect, type FC } from 'react';

import styles from './styles.module.scss';

export type EditorProps = {
  content: string;
  isReadOnly?: boolean;
  classNames?: Partial<Record<RichTextEditorStylesNames, string>>;

  onChange?: (content: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
};

export const Editor: FC<EditorProps> = ({
  content,
  isReadOnly,
  classNames,
  onChange,
  onKeyDown,
}) => {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        trailingNode: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    content,
    autofocus: true,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      handleKeyDown: (_, e) => onKeyDown?.(e),
    },
  });

  useEffect(() => {
    editor.setEditable(!isReadOnly);
    if (!isReadOnly) {
      editor.commands.focus();
    }
  }, [isReadOnly, editor]);

  return (
    <RichTextEditor
      editor={editor}
      unstyled={isReadOnly}
      classNames={{
        ...(classNames || {}),
        root: `${classNames ? classNames.root : ''} ${!isReadOnly ? styles.editing : ''} ${styles.root}`,
        toolbar: `${classNames ? classNames.toolbar : ''} ${styles.toolbar}`,
        content: `${classNames ? classNames.content : ''} ${!isReadOnly ? styles.editing : ''} ${styles.content}`,
      }}
    >
      {!isReadOnly && (
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Code />
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
            <RichTextEditor.Hr />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ClearFormatting />
        </RichTextEditor.Toolbar>
      )}

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
