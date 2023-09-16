import ytdl from "ytdl-core"
import fs from "fs"

export const download = (id) =>
  new Promise((resolve, reject) => {
    const url = `https://www.youtube.com/shorts/${id}`

    ytdl(url, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw Error("Video duration more than 60 seconds")
        }

        console.log("Downloading...")
      })
      .on("end", () => {
        console.log("Downloaded!")
        resolve()
      })
      .on("error", (error) => {
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
