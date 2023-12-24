import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { accessChat, fetchChat , createGroupChats,renameGroup,addToGroup,removeFromGroup} from '../Controllers/chatController.js';

const router = express.Router();

router.post('/',protect,accessChat);
router.get('/',protect,fetchChat);
router.post('/group',protect,createGroupChats);
router.put('/rename',protect,renameGroup);
router.put('/groupadd',protect,addToGroup);
router.put('/groupremove',protect,removeFromGroup);

export default router;