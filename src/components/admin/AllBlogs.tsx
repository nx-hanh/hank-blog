'use client';
import React, { FC, useEffect, useState } from 'react';

import { deleteBlog, getAllBlogs } from '@/actions/blog.actions';
import BlogCard from '@/components/admin/BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import useServerAction from '@/hooks/useServerAction';

interface AllBlogsProps {
  blogsDB?: Blog[];
}

const AllBlogs: FC<AllBlogsProps> = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>();
  const [runAction, isPending] = useServerAction(getAllBlogs);
  useEffect(() => {
    async function fetchBlogs() {
      const blogsDB = await runAction();
      setBlogs(blogsDB as Blog[]);
    }
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDelete = async (blog: Blog) => {
    const res = await deleteBlog(blog.id);
    if (res) {
      toast({
        title: 'Blog deleted successfully',
      });
      setBlogs(blogs?.filter((b) => b.id !== blog.id));
    } else {
      toast({
        title: 'Failed to delete blog',
      });
    }
  };
  return (
    <section className="flex w-full flex-row flex-wrap justify-evenly">
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
              <article className="w-[300px]" key={blog.id}>
                <BlogCard blog={blog} handleDelete={handleDelete} />
              </article>
            ))}
          {blogs?.length === 0 && <p>No blogs found</p>}
        </>
      )}
    </section>
  );
};

export default AllBlogs;
