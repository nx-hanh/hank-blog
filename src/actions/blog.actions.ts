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
  id: string;
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

export const deleteBlog = async (id: string) => {
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

export const getBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: id, isDeleted: false },
    });
    return blog;
  } catch (error) {
    console.error(error);
  }
};

export const readBlog = async (userId?: string) => {
  if (userId) {
    try {
      const blogs = await getBlogToReadWithUserId(userId);
      if (blogs) {
        await updateReadBlog(userId, blogs.id);
      }
      return blogs;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const blogs = await getBlogToReadRandom();
      return blogs;
    } catch (error) {
      console.error(error);
    }
  }
};

export const getBlogToReadWithUserId = async (userId: string) => {
  try {
    const userHistory = await prisma.blogReadHistory.findMany({
      where: { userId },
    });
    const allBlogs = await prisma.blog.findMany({
      where: { isDeleted: false, published: true },
    });
    if (userHistory.length === allBlogs.length) {
      return await getBlogToReadRandom();
    }
    const readBlogs = userHistory.map((history) => history.blogId);
    const blogs = allBlogs.filter((blog) => !readBlogs.includes(blog.id));
    const randomBlog = blogs[Math.floor(Math.random() * blogs.length)];
    return randomBlog;
  } catch (error) {
    console.error(error);
  }
};

export const getBlogToReadRandom = async () => {
  try {
    const allBlogs = await prisma.blog.findMany({
      where: { isDeleted: false, published: true },
    });
    const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
    return randomBlog;
  } catch (error) {
    console.error(error);
  }
};

export const updateReadBlog = async (userId: string, blogId: string) => {
  try {
    const checkHistory = await prisma.blogReadHistory.findFirst({
      where: { userId, blogId },
    });
    if (checkHistory) {
      return true;
    }
    await prisma.blogReadHistory.create({
      data: {
        userId,
        blogId,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const getHistoryBlogs = async (userId: string) => {
  try {
    const history = await prisma.blogReadHistory.findMany({
      where: { userId },
    });
    const blogIds = history.map((item) => item.blogId);
    const blogs = await prisma.blog.findMany({
      where: { id: { in: blogIds } },
    });
    return blogs;
  } catch (error) {
    console.error(error);
  }
};
