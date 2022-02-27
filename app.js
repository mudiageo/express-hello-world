const axios = require("axios")
const prompt = 'My name is Albert Einstein. I am a theoretical physicist who developed the theory of relativity. /n'

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.append('Access-Control-Allow-Origin','*')
let data = {
    context: req.query.context || prompt,
                temperature: req.query.temperature || 0.8,
                token_max_length: req.query.token_max_length || 40,
                top_p: req.query.top_p || 1,
                stop_sequence: req.query.stop_sequence || '\n',
}
let params = Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&')

  axios.post(`http://api.vicgalle.net:5000/generate?${params}`)
  .then(function (response) {
    console.log(response.data.text)
res.send(response.data.text)
  })
  .catch(function (error) {
    console.log(error);
  })
  
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


