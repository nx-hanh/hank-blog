'use server';
import prisma from '@/lib/prisma';

export const createBlog = async ({
  title,
  description,
  content,
  image,
  tags,
  date,
  published,
}: {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  date: Date;
  published: boolean;
}) => {
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        content,
        image,
        tags,
        date,
        published,
        createAt: new Date(),
        updateAt: new Date(),
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
  }
};

export const updateBlog = async ({
  id,
  title,
  description,
  content,
  image,
  tags,
  date,
  published,
}: {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  date: Date;
  published: boolean;
}) => {
  try {
    const blog = await prisma.blog.update({
      where: { id: id, isDeleted: false },
      data: {
        title,
        description,
        content,
        image,
        tags,
        date,
        published,
        updateAt: new Date(),
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isDeleted: false },
      orderBy: { date: 'desc' },
    });
    return blogs;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBlog = async (id: number) => {
  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    if (blog) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getBlog = async (id: number) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: id, isDeleted: false },
    });
    return blog;
  } catch (error) {
    console.error(error);
  }
};
