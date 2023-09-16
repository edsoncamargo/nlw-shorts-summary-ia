import { pipeline } from "@xenova/transformers"

export async function summarize(text) {
  try {
    console.log("Generating summary...")
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )

    const [output] = await generator(text)
    console.log("Generated summary...")

    return output.summary_text
  } catch (error) {
    console.log("Error when generating summary...", error)
    throw new Error(error)
  }
}
