import { Router } from "express"
import { GetBrands, SeedData, transformData } from "../controllers/brands.controller.ts"
import { BackupData } from "../Middlewares/brands.Backup.middleware.ts"


const router= Router()



router.route('/').get(GetBrands)
router.route('/transform').get(transformData)
router.route('/seed').get(SeedData)






export default router