const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get all categories
router.get('/', async (req, res) => {
  try {
    //pull in in all from the Category table including the product
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    //pull in the category table data for one id
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    //if an invalid category id is inserted return a message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    //adding a new category
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try {
  const categoryUpdate =await Category.update (
  {
    // All the fields you can update and the data attached to the request body.
    category_name: req.body.category_name,
      },
  {
    // Gets the category based on the id given in the request parameters
    where: {
      id: req.params.id,
    },
  }
  )
  res.status(200).json(categoryUpdate);}
  catch  (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete =await Category.destroy (
    {
      //gets the category based on the id given in the request paramaters
      where: {
        id: req.params.id,
      },
    }
    )
    res.status(200).json(categoryDelete);}
    catch  (err) {
      res.status(400).json(err)
    }
});

module.exports = router;
