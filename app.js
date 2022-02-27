const axios = require("axios")
const prompt = 'My name is Albert Einstein. I am a theoretical physicist who developed the theory of relativity. /n'

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.headers('Access-Control-Allow-Origin','https://express-hello-world-hh2h.onrender.com')

  axios.post('http://api.vicgalle.net:5000/generate',{
    context: req.query.context,

                temperature: 0.8,

                token_max_length: 40,

                top_p: 1,

                

                stop_sequence: '\n',
},
  {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
})
  .then(function (response) {
    console.log(response.data.text)
res.send(response.data.text)
  })
  .catch(function (error) {
    console.log(error);
  })
  
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


