const assert = require("assert");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const project = require("../../model/project");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

let browser;
let page;
const string_title = rdString((Math.random() * 8) + 1);
const string_desc = rdString((Math.random() * 50) + 1);
const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";

const test = async () => {

    const test_createproject = async () => {

        await page.waitFor("#connexion");
        await page.click("#connexion");

        await page.waitFor("body");

        await page.type("#login", "test");
        await page.type("#password", "test");

        await page.waitFor("#aut");
        const wait = page.waitForNavigation();
        await page.click("#aut");
        await wait;

        await page.waitFor("#menu1");
        await page.click("#menu1");
        await page.click("a[href='myprojects.html']");

        await page.waitFor("body");
        await page.click("a[href='createproject.html']");

        await page.waitFor("body");

        await page.type("#titre", string_title);
        await page.type("#description", string_desc);

        await page.waitFor("#create");
        const wait1 = page.waitForNavigation();

        await page.click("#create");
        await page.waitFor(".swal2-confirm");
        await page.click(".swal2-confirm");

        await wait1;

        const url_nextPage = await page.url();

        await browser.close();

        await mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err) {
                mongoose.connection.close();
            } else {
                project.projectModel.find({ Titre: string_title, Description: string_desc, Proprietaire: "test" },
                    function (err, doc) {
                        if (err) { mongoose.connection.close(); } else {
                            assert(doc.length === 1);
                            assert(doc[0].Titre === string_title);
                            assert(doc[0].Description === string_desc);
                            assert(doc[0].Proprietaire === "test");
                            assert(doc[0].Clients.length === 0);
                            assert(doc[0].Developpeurs.length === 0);
                            assert(url_nextPage === url_home + "myprojects.html");
                            console.log("Test create project passed");
                            mongoose.connection.close();
                        }
                    });
            }
        });
    };

    browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"], slowMo: 1 });
    page = await browser.newPage();
    page.goto(url_home);
    await Promise.all([test_createproject()]);
    await browser.close();
};

test();
