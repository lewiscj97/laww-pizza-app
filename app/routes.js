//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const { orderTotal } = require('./order-calculator');
const router = govukPrototypeKit.requests.setupRouter();

function getCheckboxPage(req, res, pageName, errors) {
  const data = req.session.data[pageName];
  const viewData = Array.isArray(data) ? data : [data];

  return res.render(`/${pageName}`, {
    viewData,
    errors,
  });
}

router.post("/base", function (req, res) {
  const base = req.session.data["pizza-base"];

  if (base === undefined) {
    return res.render("/base", {
      errors: [{ text: "Select a base for your pizza", href: "#pizza-base" }],
    });
  }

  // TODO: fix the link to redirect to the correct page
  return res.redirect('https://www.dominos.co.uk/');
});

router.get("/toppings", function (req, res) {
  return getCheckboxPage(req, res, 'toppings');
});

router.post("/toppings", function (req, res) {
  const toppings = req.session.data["toppings"] || [];

  if (toppings.length === 0) {
    const errors = [
      {
        text: "Select the pizza toppings or select no toppings",
        href: "#toppings",
      },
    ];
    return getCheckboxPage(req, res, 'toppings', errors);
  }

  return res.redirect("/do-you-want-sides");
});

router.post("/do-you-want-sides", function (req, res) {
  const sidesConfirm = req.session.data["do-you-want-sides"];

  // TODO: populate each case below
  switch (sidesConfirm) {
    case "Yes":
      // Hint: this should redirect to /select-sides
    case "No":
      // Hint: this should redirect to /check-answers
    default:
      // Hint: this should render /do-you-want-sides
  }
});

router.get("/select-sides", function (req, res) {
  return getCheckboxPage(req, res, 'select-sides');
});

router.post("/select-sides", function (req, res) {
  const sides = req.session.data["select-sides"] || [];

  if (sides.length === 0) {
    const errors = [
      { text: "Select the sides for your order", href: "#select-sides" },
    ];
    return getCheckboxPage(req, res, 'select-sides', errors);
  }

  return res.redirect("/check-answers");
});

router.get("/check-answers", function (req, res) {
  const sides = req.session.data["select-sides"];
  return res.render("/check-answers", { orderTotalValue: orderTotal(sides) })
});
