const axios = require("axios")
const prompt = 'My name is Albert Einstein. I am a theoretical physicist who developed the theory of relativity. /n'

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/test",  (req, res) => {
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


  let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')
 
 //axios.post(`http://api.vicgalle.net:5000/generate?${params}`)
 axios.request(options).then(function (response) {
    console.log(response)
res.send(response.text)
  })
  .catch(function (error) {
    console.log(error);
  })
 
})
app.get("/", (req, res) => {
res.append('Access-Control-Allow-Origin','*')
const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/medium/generate',
  headers: {
    Authorization: `Bearer ${process.env.COHERE_AI_KEY}`,
    'content-type': 'application/json'
  },
  data: {
    prompt: req.query.context,
    max_tokens: parseInt(req.query.token_max_length),
    temperature: parseFloat(req.query.temperature),
    k: 0,
    p: parseFloat(req.query.top_p),
    stop_sequences: [req.query.stop_sequence]
    }
};

axios.request(options).then(function (response) {
 // res.send(response.data);
res.send(req.query.context+response.data.text)
}).catch(function (error) {
res.send(error)
  console.error(error);
}); 

})
app.listen(port, () => console.log(`Render Express API app listening on port ${port}!`));


