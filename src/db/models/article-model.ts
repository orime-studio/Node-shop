
import mongoose from "mongoose";
import ArticleSchema from "../schemas/article-schema";

const Article = mongoose.model("Article", ArticleSchema);

export default Article;