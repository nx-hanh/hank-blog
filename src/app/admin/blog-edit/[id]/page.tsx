import { getBlog } from '@/actions/blog.actions';
import BlogEditHeader from '@/components/admin/blogEdit/BlogEditHeader';
import BlogEditorMDX from '@/components/admin/BlogEditorMDX';

export default async function Page({ params }: { params: { id: string } }) {
  const blog = await getBlog(Number(params.id));
  return (
    <section>
      <BlogEditHeader blog={blog as Blog} />
      <BlogEditorMDX blogDB={blog as Blog} />
    </section>
  );
}
