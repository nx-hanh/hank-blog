'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import { useState } from 'react';

import { createBlog, updateBlog } from '@/actions/blog.actions';
import { ForwardRefEditor } from '@/components/admin/ForwardRefEditor';
import { useToast } from '@/components/ui/use-toast';
const createBlogTemplate: Blog = {
  id: '-1',
  title: `Blog ${new Date().toLocaleDateString()}`,
  description: 'A blog post',
  date: new Date(),
  tags: [],
  image: '',
  content: `# Title\n\n> Published on ${new Date().toLocaleDateString()}`,
  published: false,
};
interface BlogEditorMDXProps {
  blogDB?: Blog;
}
function BlogEditorMDX({ blogDB = createBlogTemplate }: BlogEditorMDXProps) {
  const { toast } = useToast();
  const [blog, setBlog] = useState<Blog>(blogDB);
  const handleSave = async ({ blog, isCreate }: BlogSaveProps) => {
    if (isCreate) {
      const blogResponse = await createBlog(blog);
      if (blogResponse) {
        setBlog(blogResponse as Blog);
        toast({
          title: 'Success',
          description: 'Blog post created',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create blog post',
        });
      }
    } else {
      const blogResponse = await updateBlog(blog);
      if (!blogResponse) {
        toast({
          title: 'Error',
          description: 'Failed to update blog post',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Blog post updated',
        });
      }
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4">
      <div className="w-full">
        <ForwardRefEditor
          markdown={blog.content}
          onChange={(content) => setBlog({ ...blog, content })}
          blog={blog}
          setBlog={setBlog}
          handleSave={handleSave}
        />
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-4"></div>
    </div>
  );
}

export default BlogEditorMDX;
