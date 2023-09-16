import { server } from "./server.js"

const form = document.getElementById("form")
const input = document.getElementById("url")
const content = document.getElementById("content")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  content.classList.add("placeholder")

  const url = input.value

  if (url.includes("shorts") === false)
    return (content.textContent = "This url is not for a short video")

  const [_, params] = url.split("/shorts/")
  const [id] = params.split("?")

  content.textContent = "Generating audio text..."

  const transcription = await server.get(`/api/summary/${id}`)

  content.textContent = "Generating summary..."

  const summary = await server.post("/api/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
  input.value = ""
})
