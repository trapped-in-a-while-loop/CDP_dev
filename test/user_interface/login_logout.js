const assert = require("assert");
const puppeteer = require("puppeteer");

const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";

const test_login = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await page.goto(url_home);
    await page.waitFor("#connexion");
    await page.click("#connexion");

    await page.waitFor("body");

    await page.type("#login", "test");
    console.log("login : test");
    await page.type("#password", "test");
    console.log("password : test");

    await page.waitFor("#aut");
    console.log("On attend aut");
    await page.click("#aut");
    console.log("On clique sur connexion");
    await page.waitForNavigation({waitUntil: 'load'});
    console.log("On attend pour naviguer");
    const url_nextPage = await page.url();
    console.log("On récupère l'url");

    assert(url_nextPage === url_home + "index.html");
    console.log("Test log in passed");

    await page.waitFor("#deconnect");
    await page.click("#deconnect");
    console.log("On clique sur deconnexion");

    console.log("Test deconnect passed");

    await browser.close();


};

test_login();