import Category from "./category";

export default interface Mod {
  id: number;
  author: Author;
  avatarUrl: string;
  categories: Category[];
  class: Category;
  name: string;
  slug: string;
  summary: string;
  isClientCompatible: boolean;

  downloads: number;
  releaseDate: number;
  creationDate: number;
  fileSize: number;
  gameVersion: string;
}

interface Author {
  id: number;
  name: string;
  username: string;
}
