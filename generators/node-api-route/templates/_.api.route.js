/**
 * <%= componentPath %>
 * @file
 *
 * <%= projectName %> : routes : <%= componentName %>
 * <%= documentAuthor %>
 *
 * <%= documentDescription %>
 *
 * Created with the Ape-Stack Yeoman Generator
 * Copyright (c) 2016 David J. Thomas, dave.a.base@gmail.com
 * http://thePortus.com | https://github.com/thePortus
 *
 * Formatted according to John Papa's Angular style guide
 * https://github.com/johnpapa/angular-styleguide
 */

'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const controllers = require('../../../controllers');

router.get('/', controllers.roles.list);
router.post('/', passport.authenticate('jwt', { session: false }), controllers.roles.create);
router.put('/:role', passport.authenticate('jwt', { session: false }), controllers.roles.update);
router.put('/:role/increment', passport.authenticate('jwt', { session: false }), controllers.roles.increment);
router.put('/:role/decrement', passport.authenticate('jwt', { session: false }), controllers.roles.decrement);
router.delete('/role', passport.authenticate('jwt', { session: false }), controllers.roles.destroy);

module.exports = router;
