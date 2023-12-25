const express=require('express')
const app=express();
const cors= require('cors');
const mongoose = require('mongoose');
const Data = require('./model/Data');
app.use(cors());


app.use(express.json());
app.get('/',(req,res) => {
    res.send("It is running");
})
app.put('/product/:id', async (req, res) => {
  const identificationNumber = req.params.id;

  try {
      // Update data based on the identification number
      const updatedData = await Data.findOneAndUpdate(
          { identificationNumber },
          req.body,
          { new: true }
      );

      if (!updatedData) {
          return res.status(404).json({ status: 'error', message: 'Data not found' });
      }

      console.log('Data updated successfully:', updatedData);
      res.status(200).json(updatedData);
  } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ status: 'error', message: 'Error updating data' });
  }
});

app.put('/product/:id', async (req, res) => {
  const identificationNumber = req.params.id;
  const updatedData = req.body; // New data to update

  try {
    const updatedItem = await Data.findOneAndUpdate(
      { identificationNumber },
      { $set: updatedData },
      { new: true } // To return the updated document
    );

    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }

    res.status(200).json(updatedItem); // Send back the updated item
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Error updating item');
  }
});


app.get('/product', async (req, res) => {
    try {
      const allData = await Data.find({});
      res.json(allData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ status: 'error', message: 'Error fetching data' });
    }
  });
  app.delete('/product/:id', async (req, res) => {
    const identificationNumber = req.params.id;
  
    try {
      // Perform deletion based on the identificationNumber
      // Example using Mongoose (modify this based on your data model)
      const deletedItem = await Data.findOneAndDelete({ identificationNumber });
      if (!deletedItem) {
        return res.status(404).send('Item not found');
      }
  
      res.status(200).send('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).send('Error deleting item');
    }
  });
  
  app.post('/product', async (req, res) => {
    try {
        const { identificationNumber } = req.body;
        
        // Check if data with the identification number already exists
        const existingData = await Data.findOne({ identificationNumber });
        if (existingData) {
            return res.send({ status: 'error', message: 'Data with this identification number already exists' });
        }
        
        // If data doesn't exist, create a new entry
        const result = await Data.create(req.body);
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send({ status: 'error', message: error.message });
    }
});


mongoose.connect("mongodb+srv://test:test@cluster0.onl7eju.mongodb.net/")
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://test:test@cluster0.onl7eju.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// mongoose.connect("mongodb+srv://test:test@cluster0.onl7eju.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

app.listen(3004);
