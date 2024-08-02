'use client';
import '@mdxeditor/editor/style.css';

import type { ForwardedRef } from 'react';
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ButtonWithTooltip,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  quotePlugin,
  SandpackConfig,
  sandpackPlugin,
  Separator,
  ShowSandpackInfo,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import { FileUpIcon, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SelectBox from '@/components/ui/select-box';
import { ToggleCustom } from '@/components/ui/toggle-custom';
import { BlogTagOptions } from '@/types/blogTag';
async function imageUploadHandler(image: File) {
  // create a FormData object to send the image to the server
  const formData = new FormData();
  formData.append('image', image);
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch(
    'https://api.imgbb.com/1/upload?key=79fc9f079cd896453bd55dbc2973deec',
    {
      method: 'POST',
      body: formData,
    }
  );
  const json = (await response.json()) as { data: { url: string } };
  return json.data.url;
}
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps &
  BlogEditorProps) {
  const { blog, setBlog, handleSave } = props;
  const tagOptions: {
    label: string;
    value: string;
  }[] = BlogTagOptions.map((tag) => ({ label: tag, value: tag }));

  return (
    <MDXEditor
      className="rounded-md bg-white shadow-xl dark:bg-slate-500"
      plugins={[
        diffSourcePlugin({
          viewMode: 'rich-text',
          readOnlyDiff: false,
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            ts: 'TypeScript',
          },
        }),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        frontmatterPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <ButtonWithTooltip title="Save">
                <Dialog>
                  <DialogTrigger asChild>
                    <FileUpIcon size={24} />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Save Blog</DialogTitle>
                      <DialogDescription>
                        Save the blog to the database.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          defaultValue={blog.title}
                          onChange={(e) =>
                            setBlog({ ...blog, title: e.target.value })
                          }
                          className="col-span-3"
                        />
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          className="col-span-3"
                          defaultValue={blog.description}
                          onChange={(e) =>
                            setBlog({ ...blog, description: e.target.value })
                          }
                        />
                        <Label htmlFor="tags" className="text-right">
                          Tags
                        </Label>
                        <SelectBox
                          options={tagOptions}
                          value={blog.tags}
                          onChange={(tags) => setBlog({ ...blog, tags })}
                          placeholder="Select tags..."
                          inputPlaceholder="Search tags..."
                          emptyPlaceholder="No tags founded."
                          className="col-span-3"
                          multiple
                        />
                        <Label
                          htmlFor="image"
                          className="text-right"
                          title="Image URL"
                        >
                          Image
                        </Label>
                        <Input
                          id="image"
                          placeholder="Link image from ibb.co!"
                          defaultValue={blog.image}
                          onChange={(e) =>
                            setBlog({ ...blog, image: e.target.value })
                          }
                          className="col-span-3"
                        />
                        <Label htmlFor="published" className="text-right">
                          Published
                        </Label>
                        <ToggleCustom
                          checked={blog.published}
                          onChange={(e) =>
                            setBlog({ ...blog, published: e.target.checked })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          onClick={() => {
                            handleSave({ blog, isCreate: blog.id === '-1' });
                          }}
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </ButtonWithTooltip>
              <div
                className={
                  blog.id === '-1'
                    ? 'pointer-events-none flex size-8 items-center justify-center opacity-50 dark:opacity-75'
                    : 'flex size-8 items-center justify-center'
                }
              >
                <ButtonWithTooltip title="Fast Save Content">
                  <Save
                    size={24}
                    onClick={() => {
                      handleSave({ blog, isCreate: false });
                    }}
                  />
                </ButtonWithTooltip>
              </div>
              <Separator />
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
              <Separator />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === 'codeblock',
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === 'sandpack',
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>
                    ),
                  },
                ]}
              />
              <Separator />
              <InsertAdmonition />
              <InsertFrontmatter />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
      contentEditableClassName="prose dark:prose-invert max-w-full"
    />
  );
}
