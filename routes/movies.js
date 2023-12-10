var express = require('express');
var router = express.Router();

var pool = require('../dbconfig.js');


//if no limit set by user, 10 is the default
router.get('/', function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ message: 'Invalid limit parameter' });
    }
  
    pool.query(
      `SELECT * FROM movies LIMIT $1`,
      [limit],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.json(results.rows);
      }
    );
  });
  
  router.get('/:id', function (req, res) {
    pool.query(
      `SELECT * FROM movies WHERE id = ${req.params.id}`,
      (error, results) => {
        if (error) {
          throw error;
        }
        res.json(results.rows);
      }
    );
  });
  
  router.post('/', function (req, res) {
    pool.query(
      `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
      [req.body.title, req.body.genres, req.body.year],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).json({
          status: 'success',
        });
      }
    );
  });
  
  router.delete('/:id', function (req, res) {
    pool.query(
      `DELETE FROM movies WHERE id = ${req.params.id}`,
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).json({
          status: 'success',
        });
      }
    );
  });
  
  router.put('/:id', function (req, res) {
    pool.query(
      `UPDATE movies SET year = "${req.body.year}" WHERE id = ${req.params.id}`,
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).json({
          status: 'success',
        });
      }
    );
  });
  
  module.exports = router;