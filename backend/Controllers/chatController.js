
import User from "../Models/UserModel.js";
import Chat from "../models/chatModels.js";


export const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({ message: "User Id Param not sent wiith the request" })
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
        .populate("latestMessage")
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createChat._id })
                .populate("users", "-password");

            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }
}

export const fetchChat = async (req, res) => {
    try {
        // Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).then((result) => 
        //     res.send(result)
        // )
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 }).then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            })


    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export const createGroupChats = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: " Please fill all the fields " })
    }

    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).json({ message: " Please add more than 2 users for group chat " })
    }

    users.push(req.user._id);                   // Check for this line

    try {
        const groupChatData = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id,            // CHeck for this line also    req.user it is 
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChatData._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(fullGroupChat);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    if (!chatId || !chatName) {
        return res.status(400).json({ message: " Please fill all the fields " })
    }

    try {
        const updatedChatName = await Chat.findByIdAndUpdate(chatId, {
            chatName: chatName,              // first is from DB second is from req.body
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!updatedChatName) {
            res.status(400).json({ message: " Chat not found " })
        } else {
            res.status(200).send(updatedChatName);
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const addToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId },

            }, { new: true }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) {
            res.status(400).json({ message: " Chat not found " })
        } else {
            res.status(200).json(added);
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const removeFromGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const removed = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId },

            }, { new: true }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!removed) {
            res.status(400).json({ message: " Chat not found " })
        } else {
            res.status(200).json(removed);
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}