'use client';
import React, { FC, useEffect, useState } from 'react';

import { getHistoryBlogs } from '@/actions/blog.actions';
import BlogCard from '@/components/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import useServerAction from '@/hooks/useServerAction';

interface AllHistoryProps {
  userId: string;
}

const AllHistory: FC<AllHistoryProps> = ({ userId }) => {
  const [runAction, isPending] = useServerAction(getHistoryBlogs);
  const [blogs, setBlogs] = useState<Blog[]>();
  useEffect(() => {
    async function fetchBlogs() {
      const blogsDB = await runAction(userId);
      setBlogs(blogsDB as Blog[]);
    }
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="flex w-full flex-row flex-wrap justify-evenly gap-2 space-y-5">
      {isPending ? (
        <>
          {[1, 2, 3].map((i) => (
            <article className="w-[300px]" key={i}>
              <Skeleton className="h-[350px] w-[300px]" />
            </article>
          ))}
        </>
      ) : (
        <>
          {blogs &&
            blogs.length > 0 &&
            blogs.map((blog) => (
              <article className="min-h-[355px] w-[300px]" key={blog.id}>
                <BlogCard blog={blog as Blog} />
              </article>
            ))}
          {blogs?.length === 0 && <p>No blogs found</p>}
        </>
      )}
    </section>
  );
};

export default AllHistory;
