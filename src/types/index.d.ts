declare type Blog = {
  id: number;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  image: string;
  content: string;
  published: boolean;
  createAt?: Date;
  updateAt?: Date;
  isDelete?: boolean;
};
declare type BlogList = Blog[];
declare type BlogListProps = {
  blogs: BlogList;
};
declare type BlogProps = {
  blog: Blog;
};
declare type BlogSaveProps = {
  blog: Blog;
  isCreate: boolean;
};
declare type BlogEditorProps = {
  blog: Blog;
  setBlog: Dispatch<SetStateAction<Blog>>;
  handleSave: (props: BlogSaveProps) => void;
};
