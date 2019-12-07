/*import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

public class signup {
    private Selenium selenium;

    @Before
    public void setUp() throws Exception {
        WebDriver driver = new FirefoxDriver();
        String baseUrl = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";
        selenium = new WebDriverBackedSelenium(driver, baseUrl);
    }

   @Test
   public void testSelenium() throws Exception {
       //Connexion au site
       selenium.get(baseUrl);
 
       selenium.click(“#inscription”);
selenium.waitForPageToLoad(“30000”);
 
selenium.type(“id=nom”, “Dupont”);
selenium.type(“id=prenom”, “Michel”);
selenium.type(“id=mail”, “michel.dupont@mail.fr”);
selenium.type(“id=login”, “mdupont”);
selenium.type(“id=password”, “mdupont”);
selenium.type(“id=societe”, “Mano mano”);
selenium.click(“#signup”);
selenium.waitForPageToLoad(“30000”);
   }

    @After
    public void tearDown() throws Exception {
        selenium.stop();
    }
}*/

const assert = require("assert"); const puppeteer = require("puppeteer");
const mongoose = require("mongoose"); 
const user = require("../../model/user");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
    let result = ""; const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
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
page.on("dialog", async dialog => {
    await dialog.dismiss();
}); 
await page.goto(url_home); 
await page.waitFor("#inscription");
await page.click("#inscription");

await page.waitFor("body");

await page.type("#nom", string); 
await page.type("#prenom", string); 
await page.type("#mail", string + "@" + string); 
await page.type("#login", string);
await page.type("#password", string); 
await page.type("#societe", string);

await page.waitFor("#signup"); 
await page.click("#signup"); 
await page.waitForNavigation(); 
await page.keyboard.press("n"); 
const url_nextPage = await page.url();

await browser.close();

await mongoose.connect(stringConnect, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
        if (err) {
            mongoose.connection.close();
        } else {
            user.userModel.find({ Login: string },
                function (err, doc) {
                    if (err) { mongoose.connection.close(); } else {
                        assert(doc.length === 1); assert(doc[0].Nom === string); assert(doc[0].Prenom
                            === string); assert(doc[0].Mail === string + "@" + string);
                        assert(doc[0].Societe === string); assert(doc[0].Login === string);
                        assert(doc[0].Password === string); assert(url_nextPage === url_home +
                            "index.html"); console.log("Test sign up passed");
                        mongoose.connection.close();
                    }
                });
        }
    });
};

test_signup();