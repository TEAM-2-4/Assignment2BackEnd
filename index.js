const express    = require('express');
const cors       = require('cors');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const tours = require('./database/tour.js');
const guides = require('./database/guide.js');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/' , (req, res) => {
    res.json({
        message: 'hello world'
    })
})

app.post('/guide-single', (req, res) => {
    guides.getGuide(req.body).then((guide) => {
        res.json(guide);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    })
})

app.post('/add-guide', (req, res) => {
    guides.create(req.body).then((guide) => {
        res.json(guide);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.get('/guides', (req, res) => {
    guides.getAll().then((guides) => {
        res.json(guides);
    });
});

app.post('/delete-guide', (req,res) => {
    guides.deleteGuide(req.body).then((guide) => {
        res.json(guide);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.post('/edit-guide', (req, res) => {
    guides.editGuide(req.body).then((guide) => {
        res.json(guide);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    })
})

app.post('/add-tour', (req, res) => {
    tours.create(req.body).then((tour) => {
        res.json(tour);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.get('/tours', (req, res) => {
    tours.getAll().then((tours) => {
        res.json(tours);
    });
});


app.post('/tour-single', (req, res) => {
    tours.getTour(req.body).then((tour) => {
        res.json(tour);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    })
})

app.post('/delete-tour', (req,res) => {
    tours.deleteTour(req.body).then((tour) => {
        res.json(tour);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.post('/edit-tour', (req, res) => {
    tours.editTour(req.body).then((tour) => {
        res.json(tour);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
