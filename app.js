const axios = require("axios")
const prompt = 'My name is Albert Einstein. I am a theoretical physicist who developed the theory of relativity. /n'

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
//const cohere = require('cohere-ai');

app.get("/",  (req, res) => {
  res.append('Access-Control-Allow-Origin','*')


const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/medium/generate',
  headers: {
    Authorization: `Bearer ${process.env.COHERE_AI_KEY}`,
    'content-type': 'application/json'
  },
  data: {
    prompt: req.query.context || prompt,
                temperature: req.query.temperature || 0.8,
                max_tokens: req.query.token_max_length || 40,
                p: req.query.top_p || 1,
                stop_sequences: req.query.stop_sequence || '\n'

  }
};
let data = {
    prompt: req.query.context || prompt,
                temperature: req.query.temperature || 0.8,
                max_tokens: req.query.token_max_length || 40,
                p: req.query.top_p || 1,
                stop_sequences: req.query.stop_sequence || '\n',
}
/*cohere.init(process.env.COHERE_AI_KEY);

  // Hit the `generate` endpoint on the `large` model
 // const generateResponse = await cohere.generate("medium", data);
let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')
 await res.send(generateResponse.text)
console.log(`Generate: ${generateResponse}`)
*/
 //axios.post(`http://api.vicgalle.net:5000/generate?${params}`)
 axios.request(options).then(function (response) {
    console.log(response)
res.send(response.text)
  })
  .catch(function (error) {
    console.log(error);
  })
 
})
app.get("/test", (req, res) => {
res.append('Access-Control-Allow-Origin','*')
const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/medium/generate',
  headers: {
    Authorization: 'Bearer oSbYm1kDMoQIRGssEeVLjhE7P9WDXi71uyd0OYil',
    'content-type': 'application/json'
  },
  data: {
    prompt: 'Once upon a time in a magical land called',
    max_tokens: 50,
    temperature: 1,
    k: 0,
    p: 0.75
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
res.send(response.data.text)
}).catch(function (error) {
  console.error(error);
});
res.send(prompt)})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


