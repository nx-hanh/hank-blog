'use client';

import { forwardRef } from 'react';
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  // Make sure we turn SSR off
  ssr: false,
  loading: () => <Skeleton className="h-[180px] w-full" />,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<
  MDXEditorMethods,
  MDXEditorProps & BlogEditorProps
>((props, ref) => <Editor {...props} editorRef={ref} />);

// TS complains without the following line
ForwardRefEditor.displayName = 'ForwardRefEditor';
