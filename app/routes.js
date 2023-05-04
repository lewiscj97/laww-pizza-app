//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
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

  return res.redirect("/toppings");
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

  req.body.errors = undefined;
  return res.redirect("/do-you-want-sides");
});

router.post("/do-you-want-sides", function (req, res) {
  const sidesConfirm = req.body["do-you-want-sides"];

  switch (sidesConfirm) {
    case "Yes":
      req.session.data["select-sides"] ??= [];
      return res.redirect("/select-sides");
    case "No":
      req.session.data["select-sides"] = undefined;
      return res.redirect("/check-answers");
    default:
      return res.render("/do-you-want-sides", {
        errors: [
          {
            text: "Select Yes if you would like to add sides to your order",
            href: "#do-you-want-sides",
          },
        ],
      });
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

