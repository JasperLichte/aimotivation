import fs from "fs/promises"
import midjourney from "midjourney-client"
import { downloadImageToUrl, getAllArticles } from "../src/util/files.js";

async function app() {
    for (const article of (await getAllArticles())) {
        console.log(article.id, article.imageDescription);
        if (article.localFileName !== null) {
            continue;
        }

        try {
            const localFileName = `article-${article.id}.png`
            const mjUrl = (await midjourney(`mdjrny-v4 style ${article.imageDescription}`))[0]
            await downloadImageToUrl(mjUrl, `./store/images/${localFileName}`)
        } catch(error) {
        }
    }
    await addImagesToArticles();
}

app();

async function addImagesToArticles() {
    const images = await fs.readdir('./store/images');
    const articles = [];
    for (const article of (await getAllArticles())) {
        const localFileName = `article-${article.id}.png`
        const imageExists = images.includes(localFileName)
        const a = {
            ...article,
            localFileName: imageExists ? localFileName : null,
        };
        articles.push(a);

        if (imageExists) {
            await fs.writeFile(`./store/article/article-${article.id}.json`, JSON.stringify(a));
        }
    }

    await fs.writeFile(`./store/articles.json`, JSON.stringify(articles));
}
