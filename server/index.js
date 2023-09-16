import cors from "cors"
import express from "express"

import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/api/summary/:id", async (req, res) => {
  try {
    const id = req.params.id

    await download(id)
    const audioConverted = await convert()

    const text = await transcribe(audioConverted)

    res.json({ result: text })
  } catch (error) {
    console.error(error)
    return res.json({ error })
  }
})

app.post("/api/summary/", async (req, res) => {
  try {
    const result = await summarize(req.body.text)
    return res.json({ result })
  } catch (error) {
    console.error(error)
    return res.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))
