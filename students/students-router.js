const knex = require('knex');
const router = require('express').Router();

// configure knex.
const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
    // include debug: true, so helpful.
    debug: true
};
// use knex.
const db = knex(knexConfig);

// Endpoints. CRUD.
// Get. **Postman Tested: Working**
router.get('/', (req, res) => {
    db('students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json({ message: "Error retrieving the students data."})
    })
});

// Get by ID. **Postman Tested: working** (NEED TO ADJUST ENDPOINT TO INCLUDE COHORT NAME AND NOT COHORT_ID)
router.get('/:id', (req, res) => {
    db('students')
    .join('cohorts', 'cohorts.id', 'students.cohort_id')
    .select({ id: 'students.id', name:'students.name', cohort: 'cohorts.name'})
    .where({ 'students.id': req.params.id })
    .first()
    .then(student => {
        if(student) {
            res.status(200).json(student)
        } else (
            res.status(404).json({ message: "The specified student does not exist."})
        )
    })
    .catch(err => {
        // err.message gives actual helpful error messages instead of my custom messages.
        res.status(500).json(err.message)
    })
});

// Post. **Postman Tested: working**
router.post('/', (req, res) => {
    if(!req.body.name) {
        res.status(400).json({ message: "Please Provide a name for the new student."})
    } else {
        db('students')
        .insert(req.body, 'id')
        .then(ids => {
            db('students')
                .where({ id: ids[0] })
                .first()
                .then(student => {
                    res.status(201).json(student)
                })
                .catch(err => {
                    res.status(500).json({ message: "Error adding the new student."})
                })
        })
        .catch(err => {
            res.status(500).json({ message: "Error adding the new student."})
        })
    }
});

// Update. **Postman Tested: working**
router.put('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .update(req.body)
    .then(updates => {
        if(updates > 0) {
            res.status(200).json({ message: `${updates} student successfully updated.`})
        } else {
            res.status(404).json({ message: "The specified student does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error updating this student."})
    })
});

// Delete. **Postman Tested: working**
router.delete('/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .delete()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} student successfully deleted.`})
        } else {
            res.status(404).json({ message: "The specified student does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Error deleting this student."})
    })
});


module.exports = router;