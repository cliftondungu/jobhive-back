const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");
const Job = require('./models/jobs');

const mongoose = require('mongoose');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
 

app.use(bodyParser.json());



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((err) => {
  console.error(err);
});

app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.post('/jobs/create', async (req, res) => {
    console.log(req.body);
    const job = new Job({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
      requirements: req.body.requirements
    });
  
    try {
      const newJob = await job.save();
      res.status(201).json(newJob);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
