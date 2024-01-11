const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./FormData');

const app = express();
app.use(express.json());

// const corsOptions = {
//   origin: 'https://radiant-banoffee-0a6b59.netlify.app/',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

app.use(cors());

mongoose.connect('mongodb://localhost:27017/login-signup');

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json('Already registered');
      } else {
        FormDataModel.create(req.body)
          .then((log_reg_form) => res.json(log_reg_form))
          .catch((err) => res.json(err));
      }
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json('Success');
        } else {
          res.json('Wrong password');
        }
      } else {
        res.json('No records found!');
      }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
