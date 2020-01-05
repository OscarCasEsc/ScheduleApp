const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scheduleApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => { console.log('DB is connected')},
        err => { console.log(err) }
    );