//what we require in
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// route to get all from the Tag table including the product
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a single entry from the Tag table including the product by the id
router.get('/:id', async (req, res) => {
  try {
    const tryData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tryData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to add a new Tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//route to update a tag by the id
router.put('/:id', async (req, res) => {
  try {
    const tagUpdate =await Tag.update (
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
        },
    {
      // Gets the category based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
    )
    res.status(200).json(tagUpdate);}
    catch  (err) {
      res.status(400).json(err)
    }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
    try {
    const tagDelete =await Tag.destroy (
    {
      where: {
        id: req.params.id,
      },
    }
    )
    res.status(200).json(tagDelete);}
    catch  (err) {
      res.status(400).json(err)
    }
});

module.exports = router;
