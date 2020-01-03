const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');


// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
// Auth
app.use('/api/auth', require('../routes/auth'));
// Contacts
app.use('/api/contacts', require('../routes/contacts'));
// Appointments
app.use('/api/appointments', require('../routes/appointments'));

// Server initialization
app.listen(app.get('port'), () => {
    console.log('Server listening on port ', app.get('port'));
});