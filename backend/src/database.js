const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scheduleApp', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(
        () => { console.log('DB is connected')},
        err => { console.log(err) }
    );