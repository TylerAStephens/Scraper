var express = require("express");
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var mongojs = require("mongojs");
var bodyParser = require('body-parser')
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
