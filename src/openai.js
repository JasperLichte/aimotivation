async function doRequest(api, prompt) {
    const res = await api.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 4024,
    });
    return res.data.choices;
}

module.exports = {doRequest};
