const axios = require("axios")
const prompt = 'My name is Albert Einstein. I am a theoretical physicist who developed the theory of relativity. /n'

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cohere = require('cohere-ai');

app.get("/", async (req, res) => {
  res.append('Access-Control-Allow-Origin','*')
let data = {
    prompt: req.query.context || prompt,
                temperature: req.query.temperature || 0.8,
                max_tokens: req.query.token_max_length || 40,
                p: req.query.top_p || 1,
                stop_sequences: req.query.stop_sequence || '\n',
}
cohere.init(process.env.COHERE_AI_KEY);

  // Hit the `generate` endpoint on the `large` model
  const generateResponse = await cohere.generate("medium", data);
let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')
 await res.send(generateResponse.text)
/*  axios.post(`http://api.vicgalle.net:5000/generate?${params}`)
  .then(function (response) {
    console.log(response.data.text)
res.send(response.data.text)
  })
  .catch(function (error) {
    console.log(error);
  })
 */ 
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


