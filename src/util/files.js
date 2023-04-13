import fs from "fs/promises"
import {createWriteStream} from "fs"
import https from 'https'

export async function getAllArticles() {
    return JSON.parse(await fs.readFile(`./store/articles.json`));
}

export async function getArticle(id) {
    return JSON.parse(await fs.readFile(`./store/article/article-${id}.json`))
}

export function downloadImageToUrl(url, filename) {
    return new Promise((resolve, reject) => {
       https.get(url, (res) => {
           res.pipe(createWriteStream(filename))
           .on('error', reject)
           .once('close', () => resolve(filename))
       })
   })
};
