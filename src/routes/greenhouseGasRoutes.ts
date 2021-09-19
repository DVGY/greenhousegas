  
import express from 'express';
import {
 createGreenhouseGasInfo
 ,getAllGreenhouseGasInfo,getGreenhouseGasInfo
} from '../controllers/greenhouseGasController';


const router = express.Router();

router.route('/').get(getAllGreenhouseGasInfo).post(createGreenhouseGasInfo);
router
  .route('/:id')
  .get(getGreenhouseGasInfo)
 

export = router;