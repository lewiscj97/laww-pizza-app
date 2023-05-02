const puppeteer = require("puppeteer");
const { expect } = require("chai");

describe("pages-tests", () => {
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

  it("should load index page with correct header", async () => {
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

  it("should navigate to from index to base page", async () => {
    await page.goto(baseURL);
    await page.click(".govuk-button--start");
    await page.waitForSelector(".govuk-fieldset__heading", {
      visible: true,
    });

    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}base`);

    await page.screenshot({ path: `${screenshotsPath}base.png` });
  });

  it("should load base page with content", async () => {
    await page.goto(`${baseURL}base`);

    const xPaths = [
      "//*[@id='main-content']/div/div/form/div/fieldset/legend/h1",
      "//*[@id='main-content']/div/div/form/div/fieldset/div[2]/div[1]/label",
      "//*[@id='main-content']/div/div/form/div/fieldset/div[2]/div[2]/label",
      "//*[@id='main-content']/div/div/form/button",
    ];

    const [pageHeaderText, radioText, radioText2, buttonText] =
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
    expect(radioText).to.be.eq("BBQ");
    expect(radioText2).to.be.eq("Tomato");
    expect(buttonText).to.be.eq("Continue");
  });
});
