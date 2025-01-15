import Fuse from "fuse.js";
import { categories } from "./Categories";

const options = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.4,
};

export const fuse = new Fuse(categories, options);
