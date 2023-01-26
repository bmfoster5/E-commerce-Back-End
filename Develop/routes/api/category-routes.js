const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `3001/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//api/categories/1
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({ where: { id: req.params.id }, include: [{ model: Product, }]})
  .then(data => {
res.status(200).json(data)
  }) .catch(err => res.status(400).json(err)
  )
});

router.post('/', async (req, res) => {
  try {
    // Since the model will create a unique UUID value by default, we just need to provide the `id` of the Reader that will own this card
    const categoryData = await Category.create(
      req.body,
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // Since the model will create a unique UUID value by default, we just need to provide the `id` of the Reader that will own this card
    const categoryData = await Category.update(
      req.body, {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
module.exports = router;
