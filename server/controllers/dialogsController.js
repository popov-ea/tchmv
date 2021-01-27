const { response, request } = require("express");
const express = require("express");
const authJwt = require("../middleware/authJwt");
const db = require("../models");
const dialog = require("../models/dialog");
const { param } = require("./imagesController");
const Dialog = db.Dialog;
const User = db.User;
const Post = db.Post;
const Message = db.Message;
const router = express.Router();

router.get("/:id", authJwt.verifyToken, (request, response) => {
    const userid = request.userId;
    const id = request.params.id;
    if (!id) {
        return response.status(404);
    }
    Dialog.findByPk(id)
        .then((dialog) => {
            if (!dialog) {
                return response.status(404);
            }
            return response.json(dialog);
        });
});

routers.get("/for-user/:userId", authJwt.verifyToken, (request, response) => {
    if (request.params.userId !== request.userId) {
        return response.status(403);
    }

    User.findByPk(request.params.userId, { include: Dialog })
        .then((user) => {
            if (!user) {
                return response.status(500);
            }
            return response.json(user.InitiatedDialogs);
        });
})

router.get("/messages/:dialogId", authJwt.verifyToken, (request, response) => {
    Dialog.findByPk(request.params.dialogId, { include: [Post, Message] })
        .then((dialog) => {
            if (!dialog) {
                return response.status(404);
            }
            const userPermitted = (dialog.Post && dialog.Post.userId == request.userId)
                || (dialog.initiatorId == request.userId)
            if (!userPermitted) {
                return response.status(403);
            }
            return
        })
});

router.get("/init/:postId", authJwt.verifyToken, (request, response) => {
    if (!request.params.postId) {
        return response.status(404);
    }
    Post.findByPk(response.params.postId, { include: [Dialog] })
        .then((post) => {
            if (!post) {
                return response.status(404);
            }
            return Dialog.create({
                postId: post.id,
                initiatorId: request.userId
            });
        })
        .then((dialog) => {
            return response.json(dialog);
        });
});


//new message
router.post("/messages/:dialogId", authJwt.verifyToken, (request, response) => {
    if (!request.params.dialogId) {
        return response.status(400);
    }

    Dialog.findByPk(request.params.dialogId, { include: [Message, Post] })
        .then((dialog) => {
            if (!dialog) {
                return response.status(405);
            }
            const userIds = [dialog.Post.userId, dialog.initiatorId];
            const userPermitted = userIds.some((i) => i === request.userId);
            if (!userPermitted) {
                return response.status(403);
            }
            return Message.create({
                dialogId: dialogId.id,
                txt: request.body.text,
                fromUserId: request.userId,
                toUserId: userIds.find(uid => uid !== request.userId)
            }).then((message) => response.json([...dialog.Messages, message]));
        });
});