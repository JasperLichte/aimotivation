const { OpenAIApi, Configuration } = require('openai');
const { doRequest } = require('../src/openai');
const textListToArray = require('../src/util/textListToArray');
const fs = require('fs/promises');

require('dotenv').config();

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_KEY
    })
);

async function app(openai, n = 0) {
    const choices = await doRequest(
        openai,
        'Give me a list of 10 unique sport performance related phrases.'
    );

    let objs = await Promise.all(textListToArray(choices[0].text).map(async c => ({
        header: (await doRequest(openai, `
            Turn this phrase into a mesmerizing, short headline
            
            ${c}
        `))[0].text.trim(),
        imageDescription: (await doRequest(openai, `
            Describe an image for this motivational phrase to Midjourney. Just the description, nothing else.
            
            ${c}
        `))[0].text.trim(),
        instagramCaption: (await doRequest(openai, `
            Write a creative instagram caption for a post about this motivational phrase. Make it long and add the important hashtags

            ${c}
        `))[0].text.trim(),
        content: (await doRequest(openai, `
            Write a short, enthusiastic article that has this headline:

            ${c}
        `))[0].text.trim(),
    })));

    console.log(objs);
    await fs.writeFile(`./store/articles/articles-${n+1}.json`, JSON.stringify(objs));

    if (n < 20) {
        setTimeout(() => app(openai, ++n), 60000);
    }
}

app(openai);
