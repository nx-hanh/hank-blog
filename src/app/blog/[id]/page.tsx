import '@/styles/code.css';

import { Suspense } from 'react';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { getBlog } from '@/actions/blog.actions';
import defaultImgSrc from '@/assets/images/blog-default.jpg';

export default async function Page({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);
  const { content } = await compileMDX({
    source: blog?.content || '# 404 content not found',
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });
  const imgSrc = blog?.image || defaultImgSrc;
  return (
    <main
      className={`prose dark:prose-invert container mx-auto max-w-screen-md py-6`}
    >
      <Image
        src={imgSrc}
        alt="blog image"
        width={800}
        height={200}
        className="h-44 w-full rounded-lg shadow-lg"
      />
      <Suspense fallback={<>Loading...</>}>{content}</Suspense>
    </main>
  );
}
