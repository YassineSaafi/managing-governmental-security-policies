const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');

router.post('/ajout', (req, res) => {
    let data = req.body;
    let policy = new Policy(data);
    policy.save()
        .then(saved => {
            res.status(200).send(saved);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/all', (req, res) => {
    Policy.find({})
        .then(policies => {
            res.status(200).send(policies);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/byid/:id', (req, res) => {
    let id = req.params.id;
    Policy.findOne({ _id: id })
        .then(policy => {
            res.status(200).send(policy);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    Policy.findByIdAndUpdate({ _id: id }, data, { new: true })
        .then(updatedPolicy => {
            res.status(200).send(updatedPolicy);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    Policy.findByIdAndDelete({ _id: id })
        .then(deletedPolicy => {
            if (!deletedPolicy) {
                return res.status(404).send("Policy not found");
            }
            res.status(200).send("Policy deleted successfully");
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


module.exports = router;
