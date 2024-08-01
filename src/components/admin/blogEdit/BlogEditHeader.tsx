'use client';
import React, { FC } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BlogEditHeaderProps {
  blog: Blog;
}

const BlogEditHeader: FC<BlogEditHeaderProps> = ({ blog }) => {
  const router = useRouter();
  return (
    <div className="my-2 flex h-10 shrink flex-row items-center justify-start gap-1 py-1">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeftIcon size={24} />
      </Button>
      <Separator orientation="vertical" className="bg-foreground" />
      <h1 className="text-2xl font-bold">{blog.title}</h1>
    </div>
  );
};

export default BlogEditHeader;
