const puppeteer = require("puppeteer");
const { expect } = require("chai");

describe("pages-routing", () => {
  const baseURL = "http://localhost:3000/";

  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new'
    });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  it("should navigate from index to base page", async () => {
    await page.goto(baseURL);
    await page.click(".govuk-button--start");
    await page.waitForSelector(".govuk-fieldset__heading", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}base`);
  });

  it("should navigate from base to toppings page", async () => {
    await page.goto(`${baseURL}base`);
    await page.click("#pizza-base");
    await page.click(".govuk-button");
    await page.waitForSelector(".govuk-fieldset__heading", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}toppings`);
  });

  it("should navigate from toppings to do you want sides page", async () => {
    await page.goto(`${baseURL}toppings`);
    await page.click("#toppings");
    await page.click(".govuk-button");
    await page.waitForSelector(".govuk-fieldset__heading", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}do-you-want-sides`);
  });

  it("should navigate from do you want sides to select sides page when selecting yes", async () => {
    await page.goto(`${baseURL}do-you-want-sides`);
    await page.click("#do-you-want-sides");
    await page.click(".govuk-button");
    await page.waitForSelector(".govuk-fieldset__heading", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}select-sides`);
  });

  it("should navigate from do you want sides to check answers page when selecting no", async () => {
    await page.goto(`${baseURL}do-you-want-sides`);
    await page.click("#do-you-want-sides-2");
    await page.click(".govuk-button");
    await page.waitForSelector(".govuk-heading-xl", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}check-answers`);
  });

  it("should navigate from select sides to check answers page", async () => {
    await page.goto(`${baseURL}select-sides`);
    await page.click("#select-sides");
    await page.click(".govuk-button");
    await page.waitForSelector(".govuk-heading-xl", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}check-answers`);
  });

  it("should navigate from check answers to confirmation page", async () => {
    await page.goto(`${baseURL}check-answers`);
    await page.click(".govuk-button");
    await page.waitForSelector(".govuk-heading-m", {
      visible: true,
    });
    const url = await page.evaluate(() => document.location.href);
    expect(url).to.be.eq(`${baseURL}confirmation`);
  });
});