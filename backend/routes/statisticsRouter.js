const express = require('express');
const router = express.Router();

const { getLastWeekStatisticsByUser } = require('../model/statistics');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(parseInt(id))) {
    return res.status(400).json({ message: 'Incorrect ID' });
  }

  const data = await getLastWeekStatisticsByUser(id);
  return res.json({ data });
});

module.exports = router;
