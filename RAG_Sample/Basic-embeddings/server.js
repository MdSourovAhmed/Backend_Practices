// import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
// Change this:
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

// The underlying library it now uses is:
// @huggingface/transformers

// Initialize the local embedding model
const embeddings = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2", // Optimized version for JS
});

// Example: Embedding a single query
const vector = await embeddings.embedQuery("Hello world");
console.log(vector); // Returns a 384-dimensional array
