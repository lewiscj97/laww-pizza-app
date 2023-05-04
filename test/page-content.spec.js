const puppeteer = require("puppeteer");
const { expect } = require("chai");

describe("pages-content", () => {
  const baseURL = "http://localhost:3000/";
  const screenshotsPath = `${process.cwd()}/test/screenshots/`;

  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  describe('index', () => {
    it.only("should render page with correct header and button content", async () => {
      await page.goto(baseURL);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/h1",
        "//*[@id='main-content']/div/div/a",
      ];
  
      const [pageHeaderText, buttonText] = await Promise.all(
        xPaths.map(async (xPath) => {
          const [element] = await page.$x(xPath);
          const elementText = await page.evaluate((el) => el.innerText, element);
          return elementText;
        })
      );
  
      expect(pageHeaderText).to.be.eq("Department for Work and Pizza");
      expect(buttonText).to.be.eq("Get started!");
  
      await page.screenshot({ path: `${screenshotsPath}index.png` });
    });
  });

  describe('base', () => {
    it("should render page with content", async () => {
      await page.goto(`${baseURL}base`);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/form/div/fieldset/legend/h1",
        "//*[@id='main-content']/div/div/form/div/fieldset/div[2]/div[1]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div[2]/div[2]/label",
        "//*[@id='main-content']/div/div/form/button",
      ];
  
      const [pageHeaderText, radioText1, radioText2, buttonText] =
        await Promise.all(
          xPaths.map(async (xPath) => {
            const [element] = await page.$x(xPath);
            const elementText = await page.evaluate(
              (el) => el.innerText,
              element
            );
            return elementText;
          })
        );
  
      expect(pageHeaderText).to.be.eq("Choose your pizza base");
      expect(radioText1).to.be.eq("Tomato");
      expect(radioText2).to.be.eq("BBQ");
      expect(buttonText).to.be.eq("Continue");
  
      await page.screenshot({ path: `${screenshotsPath}base.png` });
    });

    it("should render page with error", async () => {
      await page.goto(`${baseURL}base`);
      await page.click(".govuk-button");
      await page.waitForSelector(".govuk-fieldset__heading", {
        visible: true,
      });
      
      const [error] = await page.$x("//*[@id='main-content']/div/div/div/div/div/ul/li/a");
      const errorMessage = await page.evaluate(
        (el) => el.innerHTML,
        error
        );
        
      expect(errorMessage).to.be.eq("Select a base for your pizza");
        
      await page.screenshot({ path: `${screenshotsPath}base-error.png` });
    });
  });

  describe('toppings', () => {
    it("should render page with content", async () => {
      await page.goto(`${baseURL}toppings`);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/form/div/fieldset/legend/h1",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[1]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[2]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[3]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[4]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[5]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[7]/label",
        "//*[@id='main-content']/div/div/form/button",
      ];
  
      const [
        pageHeaderText,
        checkbox1,
        checkbox2,
        checkbox3,
        checkbox4,
        checkbox5,
        checkbox6,
        buttonText,
      ] = await Promise.all(
        xPaths.map(async (xPath) => {
          const [element] = await page.$x(xPath);
          const elementText = await page.evaluate((el) => el.innerText, element);
          return elementText;
        })
      );
  
      expect(pageHeaderText).to.be.eq("Select your toppings");
      expect(checkbox1).to.be.eq("Cheese");
      expect(checkbox2).to.be.eq("Pepperoni");
      expect(checkbox3).to.be.eq("Olives");
      expect(checkbox4).to.be.eq("Ham");
      expect(checkbox5).to.be.eq("Pineapple");
      expect(checkbox6).to.be.eq("No toppings");
      expect(buttonText).to.be.eq("Continue");
  
      await page.screenshot({ path: `${screenshotsPath}toppings.png` });
    });
  
  
    it("should render page with error", async () => {
      await page.goto(`${baseURL}toppings`);
      await page.click(".govuk-button");
      await page.waitForSelector(".govuk-fieldset__heading", {
        visible: true,
      });
      
      const [error] = await page.$x("//*[@id='main-content']/div/div/div/div/div/ul/li/a");
      const errorMessage = await page.evaluate(
        (el) => el.innerHTML,
        error
        );
        
      expect(errorMessage).to.be.eq("Select the pizza toppings or select no toppings");
        
      await page.screenshot({ path: `${screenshotsPath}toppings-error.png` });
    });
  });

  describe('sides confirmation', () => {
    it("should render page with content", async () => {
      await page.goto(`${baseURL}do-you-want-sides`);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/form/div/fieldset/legend/h1",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[1]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[2]/label",
        "//*[@id='main-content']/div/div/form/button",
      ];
  
      const [
        pageHeaderText,
        radio1,
        radio2,
        buttonText,
      ] = await Promise.all(
        xPaths.map(async (xPath) => {
          const [element] = await page.$x(xPath);
          const elementText = await page.evaluate((el) => el.innerText, element);
          return elementText;
        })
      );
  
      expect(pageHeaderText).to.be.eq("Do you want sides?");
      expect(radio1).to.be.eq("Yes");
      expect(radio2).to.be.eq("No");
      expect(buttonText).to.be.eq("Continue");
  
      await page.screenshot({ path: `${screenshotsPath}do-you-want-sides.png` });
    });
  
  
    it("should render page with error", async () => {
      await page.goto(`${baseURL}do-you-want-sides`);
      await page.click(".govuk-button");
      await page.waitForSelector(".govuk-fieldset__heading", {
        visible: true,
      });
      
      const [error] = await page.$x("//*[@id='main-content']/div/div/div/div/div/ul/li/a");
      const errorMessage = await page.evaluate(
        (el) => el.innerHTML,
        error
        );
        
      expect(errorMessage).to.be.eq("Select Yes if you would like to add sides to your order");
        
      await page.screenshot({ path: `${screenshotsPath}do-you-want-sides-error.png` });
    });
  });

  describe('select sides', () => {
    it("should render page with content", async () => {
      await page.goto(`${baseURL}select-sides`);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/form/div/fieldset/legend/h1",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[1]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[2]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[3]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[4]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[5]/label",
        "//*[@id='main-content']/div/div/form/div/fieldset/div/div[6]/label",
        "//*[@id='main-content']/div/div/form/button",
      ];
  
      const [
        pageHeaderText,
        checkbox1,
        checkbox2,
        checkbox3,
        checkbox4,
        checkbox5,
        checkbox6,
        buttonText,
      ] = await Promise.all(
        xPaths.map(async (xPath) => {
          const [element] = await page.$x(xPath);
          const elementText = await page.evaluate((el) => el.innerText, element);
          return elementText;
        })
      );
  
      expect(pageHeaderText).to.be.eq("Select your sides");
      expect(checkbox1).to.be.eq("Garlic Bread");
      expect(checkbox2).to.be.eq("Cheesy Garlic Bread");
      expect(checkbox3).to.be.eq("Fries");
      expect(checkbox4).to.be.eq("Potato Tots");
      expect(checkbox5).to.be.eq("BBQ Chicken Wings");
      expect(checkbox6).to.be.eq("Chicken Bites");
      expect(buttonText).to.be.eq("Continue");
  
      await page.screenshot({ path: `${screenshotsPath}select-sides.png` });
    });
  
  
    it("should render page with error", async () => {
      await page.goto(`${baseURL}select-sides`);
      await page.click(".govuk-button");
      await page.waitForSelector(".govuk-fieldset__heading", {
        visible: true,
      });
      
      const [error] = await page.$x("//*[@id='main-content']/div/div/div/div/div/ul/li/a");
      const errorMessage = await page.evaluate(
        (el) => el.innerHTML,
        error
        );
        
      expect(errorMessage).to.be.eq("Select the sides for your order");
        
      await page.screenshot({ path: `${screenshotsPath}select-sides-error.png` });
    });
  });

  describe('check answers', () => {
    it("should render page with content", async () => {
      await page.goto(`${baseURL}check-answers`);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/h1",
        "//*[@id='main-content']/div/div/dl/div[1]/dt",
        "//*[@id='main-content']/div/div/dl/div[2]/dt",
        "//*[@id='main-content']/div/div/h2",
        "//*[@id='main-content']/div/div/p",
        "//*[@id='main-content']/div/div/form/button",
      ];
  
      const [
        pageHeaderText,
        tableLabel1,
        tableLabel2,
        subHeading,
        declaration,
        buttonText,
      ] = await Promise.all(
        xPaths.map(async (xPath) => {
          const [element] = await page.$x(xPath);
          const elementText = await page.evaluate((el) => el.innerText, element);
          return elementText;
        })
      );
  
      expect(pageHeaderText).to.be.eq("Check your answers");
      expect(tableLabel1).to.be.eq("Pizza base");
      expect(tableLabel2).to.be.eq("Toppings");
      expect(subHeading).to.be.eq("Order your pizza");
      expect(declaration).to.be.eq("By submitting this application you are confirming that, to the best of your knowledge, this is the pizza you'd like to order.");
      expect(buttonText).to.be.eq("Accept and send");
  
      await page.screenshot({ path: `${screenshotsPath}check-answers.png` });
    });
  });

  describe('confirmation', () => {
    it("should render page with content", async () => {
      await page.goto(`${baseURL}confirmation`);
  
      const xPaths = [
        "//*[@id='main-content']/div/div/div/h1",
        "//*[@id='main-content']/div/div/h2",
        "//*[@id='main-content']/div/div/p",
      ];
  
      const [
        pageHeaderText,
        subHeading,
        confirmation,
      ] = await Promise.all(
        xPaths.map(async (xPath) => {
          const [element] = await page.$x(xPath);
          const elementText = await page.evaluate((el) => el.innerText, element);
          return elementText;
        })
      );
  
      expect(pageHeaderText).to.be.eq("Pizza ordered!");
      expect(subHeading).to.be.eq("What happens next");
      expect(confirmation).to.be.eq("We will deliver your pizza to you soon.");
  
      await page.screenshot({ path: `${screenshotsPath}confirmation.png` });
    });
  });

 

});
