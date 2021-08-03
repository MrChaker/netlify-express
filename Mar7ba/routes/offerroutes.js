const express = require('express');
const offercontroller = require('../coontroller/offercontroller')
const router = express.Router();
const {Checkuser} = require('../middleware/authmiddleware');

router.get('/',offercontroller.primary);
router.get('/New-offer', offercontroller.Ocreat);

/* router.get(':job/', Checkuser,offercontroller.filteredjob2); */

router.get('/:id', offercontroller.someoffer);
router.post('/', offercontroller.OPost);

router.delete('/:id', offercontroller.Odelete)

/* router.get('/Profile',Checkuser,  offercontroller.profile); */

module.exports = router
