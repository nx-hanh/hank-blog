import { getBlog } from '@/actions/blog.actions';

export default async function Page({ params }: { params: { id: string } }) {
  const blog = await getBlog(Number(params.id));
  console.log(blog);
  return <div>{blog?.title}</div>;
}
