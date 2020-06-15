const router = require('express').Router();
const { Category, Product } = require('../../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.categoryName
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.upsert({
    id: req.params.id,
    category_name: req.body.categoryName
  })
    .then(created => {
      created ? res.send({ message: `Created resource with id ${req.params.id}` }) :
        res.sendStatus(204);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(numRecords => {
      if (numRecords) {
        res.send({ message: `Deleted resource with id ${req.params.id}` });
      } else {
        res.status(404).send({ message: `Could not locate resource with id ${req.params.id}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
