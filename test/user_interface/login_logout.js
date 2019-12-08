const assert = require("assert");
const puppeteer = require("puppeteer");

const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";

let browser;
let page;

const test = async () => {

  const test_login = async () => {

    await page.goto(url_home);
    await page.waitFor("#connexion");
    await page.click("#connexion");

    await page.waitFor("body");

    await page.type("#login", "test");
    await page.type("#password", "test");

    await page.waitFor("#aut");
    await page.click("#aut");
    await page.waitForNavigation({waitUntil: 'load'});
    const url_nextPage = await page.url();

    assert(url_nextPage === url_home + "index.html");
    console.log("Test log in passed");

  };

  const test_logout = async () => {

    await page.waitFor("#deconnect");
    await page.click("#deconnect");

    console.log("Test deconnect passed");

  };

  browser = await puppeteer.launch({headless : true});
  page = await browser.newPage();
/*  page.on("dialog", async dialog => {
    await dialog.dismiss();
  });*/
  await test_login();
  await test_logout();
  await browser.close();
};

test();
