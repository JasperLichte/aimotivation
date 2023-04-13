import Jimp from "jimp";
import { getAllArticles } from "../src/util/files.js";

async function app() {
    for (const article of (await getAllArticles())) {
        if (article.localFileName === null) {
            continue;
        }

        await writeHeadingToImage(article.localFileName, article.header);
    }
}

app()

async function writeHeadingToImage(fileName, heading) {
    const parts = heading.trim().split(' ');
    if (!heading.length) return;

    const lines = [];
    let wordsLeft = parts.length;
    let i = 0;
    while (wordsLeft > 0) {
        const current = parts[i];
        const next = parts[i + 1];
        const afterNext = parts[i + 2];

        if (wordsLeft === 1) {
            lines.push(current)
            wordsLeft = wordsLeft - 1
            i = i + 1
            continue
        }

        if (next && afterNext && current.length + next.length + afterNext < 15) {
            lines.push(current + ' ' + next + ' ' + afterNext)
            wordsLeft = wordsLeft - 3
            i = i + 3
            continue
        }

        if (next && current.length + next.length < 15) {
            lines.push(current + ' ' + next)
            wordsLeft = wordsLeft - 2
            i = i + 2
            continue
        }

        lines.push(current)
        wordsLeft = wordsLeft - 1
        i = i + 1
    }

    const image = await Jimp.read(`./store/images/${fileName}`);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

    image.brightness(-.7)

    for (let j = 0; j < lines.length; j++) {
        image.print(font, 10, 10 + j * 78, lines[j]);
    }

    image.write(`./store/images-with-text/${fileName}`);
}
