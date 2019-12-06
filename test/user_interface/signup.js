const assert = require("assert");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const user = require("../../model/user");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
   "use strict";
   let result = "";
   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}

const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";
const string = rdString((Math.random() * 8) + 1);

const test_signup = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url_home);
    await page.waitFor("body");

    await page.evaluate(() => {
        document.querySelector("#nom").value = string;
        document.querySelector("#prenom").value = string;
        document.querySelector("#mail").value = string + "@" + string;
        document.querySelector("#login").value = string;
        document.querySelector("#password").value = string;
        document.querySelector("#societe").value = string;
    });

    await page.click("#signup");
    await page.waitForNavigation();
    const url_nextPage = await page.url();

    mongoose.connect(stringConnect, {useNewUrlParser:true, useUnifiedTopology: true}, function(err){
        if(err) {
            mongoose.connection.close();
        }else{
            user.userModel.find({Login:string}, function(err, doc){
                if(err) {
                    mongoose.connection.close();
                }else{
                    assert((doc.length === 1) && (doc.Nom === string) && (doc.Prenom === string) &&
                    (doc.Mail === string + "@" + string) && (doc.Societe === string) && (doc.Login === string) &&
                    (doc.Password === string) && (url_nextPage === url_home));
                    mongoose.connection.close();
                }
            });
        }
    });

    await browser.close();
};

test_signup();