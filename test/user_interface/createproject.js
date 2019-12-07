const assert = require("assert");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const user = require("../../model/project");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const url_home = "https://cdp-ropert-dupland-tomas.000.webhostapp.com/";

const test_createproject = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await page.goto(url_home);
    await page.waitFor("#")
}