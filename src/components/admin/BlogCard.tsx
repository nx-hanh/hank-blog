'use client';
import React, { FC } from 'react';
import { FilePenLineIcon, ScreenShareIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import defaultImgSrc from '@/assets/images/blog-default.jpg';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BlogCardProps {
  blog: Blog;
  handleDelete: (blog: Blog) => void;
}

const BlogCard: FC<BlogCardProps> = ({ blog, handleDelete }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>{blog.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={blog.image || defaultImgSrc}
          alt={blog.title}
          height={100}
          width={300}
          className="rounded-md object-cover"
        />
      </CardContent>
      <CardFooter className="justify-around">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2Icon size={16} color="#c71835" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                blog and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(blog)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant={'secondary'}
          className="flex items-center justify-center gap-2"
          onClick={() => router.push(`/admin/blog-edit/${blog.id}`)}
        >
          <FilePenLineIcon size={16} />
          <span>Edit</span>
        </Button>
        <Button
          className="flex items-center justify-center gap-2"
          onClick={() => router.push(`/blog/${blog.id}`)}
        >
          <ScreenShareIcon size={16} />
          <span>View</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
