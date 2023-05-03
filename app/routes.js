//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

router.post('/toppings', function (req, res) {
  const toppings = req.body['toppings'];

  if (toppings === '_unchecked') {
    return res.render('/toppings', {
      errors: [{ text: 'Select the pizza toppings or select No toppings', href: '#toppings' }],
    });
  }

  return res.redirect('/sides-confirm');
});

router.post('/sides-confirm', function (req, res) {
  const sidesConfirm = req.body['sides-confirm'];

  switch (sidesConfirm) {
    case 'yes':
      return res.redirect('/select-sides');
    case 'no':
      req.session.data['select-sides'] = undefined;
      return res.redirect('/check-answers');
    default:
      return res.render('/sides-confirm', {
        errors: [{ text: 'Select Yes if you would like to add sides to your order', href: '#sides-confirm' }],
      });
  }
});

router.post('/select-sides', function (req, res) {
  const sides = req.body['select-sides'];

  if (sides === '_unchecked') {
    return res.render('/select-sides', {
      errors: [{ text: 'Select the sides for your order', href: '#select-sides' }],
    });
  }

  return res.redirect('/check-answers');
});

