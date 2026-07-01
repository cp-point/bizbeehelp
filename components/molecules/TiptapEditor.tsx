'use client';

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

type TiptapEditorProps = {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onImageUpload?: (file: File, fileData: string) => Promise<string>;
};

const TiptapEditor = (props: TiptapEditorProps) => {
    return <SimpleEditor {...props} />;
};

export default TiptapEditor;
