import React, { FC } from 'react';

import AllBlogs from '@/components/admin/AllBlogs';
import BlogEditorMDX from '@/components/admin/BlogEditorMDX';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface adminPageProps {}

const Admin: FC<adminPageProps> = () => {
  return (
    <section className="size-full">
      <Tabs
        defaultValue="blogs"
        className="flex size-full flex-col items-center justify-start pt-4"
      >
        <TabsList className="flex w-fit items-center justify-center">
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="blogs" className="size-full">
          <AllBlogs />
        </TabsContent>
        <TabsContent value="create" className="size-full">
          <BlogEditorMDX />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Admin;
