const axios = require('axios');
const express = require('express'); 

const app = express()

const port = process.env.PORT || 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/updatelogintime', (req, res) => {

  const { email } = req.query;
  console.log('Request is ', req);  
  const eventData = {
    "portalId": 20500346,
    "email": email,
    "eventName": "pe20500346_member_login",
  };
  const data = { "properties": [] };
  const config = { // important!
    headers: {
      "Content-Type": "application/json",
    }
  };
  axios.post('https://api.hubspot.com/events/v3/send?hapikey=7590e65f-4eb4-4dcb-8dca-ebc6237f96bd', eventData,config ).then(response =>{
    console.log('Success', email);  
    res.send(response);
  }).catch(error => {
      console.error('There was an error!', error);
      res.send(error);
  });
})

app.get('/register', (req, res) => {

  const { email } = req.query;
  console.log('Request is ', req);  
  const eventData = {
    "portalId": 20500346,
    "email": email,
    "eventName": "pe20500346_member_registration",
  };
  const data = { "properties": [] };
  const config = { // important!
    headers: {
      "Content-Type": "application/json",
    }
  };
  axios.post('https://api.hubspot.com/events/v3/send?hapikey=7590e65f-4eb4-4dcb-8dca-ebc6237f96bd', eventData,config ).then(response =>{
    console.log('Success', email);  
    res.send(response);
  }).catch(error => {
      console.error('There was an error!', error);
      res.send(error);
  });
})


app.get('/membershiplevelchange', (req, res) => {
  const { email, levelId, cancelledAt } = req.query;
  const levels = ['None','Sales Assembly Member', 'Sales Assembly Member Company'];
  const level = levels[levelId] ? levels[levelId] : 'NA';
  console.log('Request QUery is ', req.query);
  const data = { "properties": [{ "property": "membership_status","value": levels[levelId]}] };  
  const eventData = {
    "portalId": 20500346,
    "email": email,
    "eventName": "pe20500346_membership_change",
    "properties": {
        "membership_status": level
    }
  };
  const config = { // important!
    headers: {
      "Content-Type": "application/json",
    }
  };
  axios.post(`https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=7590e65f-4eb4-4dcb-8dca-ebc6237f96bd`, data, config)
    .then(response =>{
      axios.post('https://api.hubspot.com/events/v3/send?hapikey=7590e65f-4eb4-4dcb-8dca-ebc6237f96bd', eventData,config ).then(response =>{
          res.send(response);
      }).catch(error => {
          console.error('There was an error!', error);
          res.send(error);
      });
    })
    .catch(error => {
        console.error('There was an error!', error);
        res.send(error);
  });
})

app.get('/rsvp', async (req, res) => {
  const { email, eventName } = req.query;
  const eventData = {
    "portalId": 20500346,
    "email": email,
    "eventName": "pe20500346_rsvp",
    "hs_page_title": eventName,
    "pageName": eventName
  };
  const config = { // important!
    headers: {
      "Content-Type": "application/json",
    }
  };
  await axios.post('https://api.hubspot.com/events/v3/send?hapikey=7590e65f-4eb4-4dcb-8dca-ebc6237f96bd', eventData,config ).then(response =>{
      res.send(response);
  }).catch(error => {
      console.error('There was an error!', error);
      res.send(error);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})