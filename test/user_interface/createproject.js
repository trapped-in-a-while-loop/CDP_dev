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

const url_home = "https://cdp-ropert-dupland-tomas.000.webhostapp.com/";

const test_createproject = async () => {
    const string_title = rdString((Math.random() * 8) + 1);
    const string_desc = rdString((Math.random() * 50) + 1);
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await page.goto(url_home);
    await page.waitFor("#connexion");
    await page.click("#connexion");

    await page.waitFor("body");

    await page.type("#login", "test");
    await page.type("#password", "test");

    await page.waitFor("#aut");
    await page.click("#aut");

    await page.waitFor("body");

    await page.waitFor("#menu1");
    await page.click("#menu1");

    await page.waitFor("#myprojects");
    await page.click("#myprojects");

    await page.waitFor("body");

    await page.waitFor("#createprojects");
    await page.click("#createpojects");

    await page.waitFor("body");

    await page.type("#titre", string_title);
    await page.type("#description", string_desc);

    await page.waitFor("#create");
    await page.click("#create");
    await page.waitForNavigation({waitUntil: 'load'});

    const url_nextPage = await page.url();

    await browser.close();

    await mongoose.connect(stringConnect, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
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
}
