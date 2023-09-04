const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const { error } = require("console");
const { request } = require("http");

function pwd(print) {
    print(process.cwd())
}

function date(print) {
    print(Date())
}

function echo(print, args) {
    print(args)
}

function ls(print) {
    fs.readdir(".", (error, files) => {
        if(error) {throw error}
        else {print(files)}
    })
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) throw error
        print(data)
    })
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) throw error
        const lines = data.split('\n');
        const firstLine = lines[0];
        print(firstLine);
    } )
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) throw error
        const lines = data.split('\n');
        const lastLine = lines[lines.length -1];
        print(lastLine)

    })
}

function curl(print, args) {
    utils(args, (error, response) => {
        if(error) throw error
        print(response)
    })
}

module.exports = {};
