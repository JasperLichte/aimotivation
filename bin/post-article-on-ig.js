import dotenv from 'dotenv'
import { PostPagePhotoMediaRequest } from 'instagram-graph-api'
import { getArticle } from '../src/util/files.js'

dotenv.config()

const articleIdToPost = 1

async function app() {
    const article = await getArticle(articleIdToPost)

    const request = new PostPagePhotoMediaRequest(process.env.INSTAGRAM_ACCESS_TOKEN)
    console.log(article)
}

app()
