const AccountModel = require("../Models/accountModel")
const CommentModel = require("../Models/commentModel")

const createComment = async (req, res) => {
    const { songId } = req.params
    const { comment } = req.body
    try {
        if (!comment) return res.status(400).json({ message: "Hãy viết bình luận " })

        const tokenUserId = req.user.id

        let result = new CommentModel({
            song_id: songId,
            account_id: tokenUserId,
            comment: comment
        })

        await result.save()

        res.status(200).json({ data: result, status: true, message: "Bình luận thành công" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body
    try {
        if (!comment) return res.status(400).json({ message: "Hãy viết bình luận " })

        let result = await CommentModel.findOne({ where: { id } })
        const tokenUserId = req.user.id

        const updateData = { comment }

        const update = await CommentModel.update(updateData, {
            where: {
                id: id,
                account_id: tokenUserId
            }
        })
        if (!update) res.status(400).json({ message: "Cập nhật không thành công" })

        res.status(200).json({ data: result, status: true, message: "Cập nhật thành công" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    const { id } = req.params
    const tokenUserId = req.user.id
    try {
        let result = await CommentModel.findOne({
            where: { id: id, account_id: tokenUserId }
        })
        if (!result) return res.status(400).json({ message: "Xoá không thành công" })

        await result.destroy();

        res.status(200).json({ message: "Xoá thành công", status: true })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllComment = async (req, res) => {
    const { songId } = req.params
    try {
        let result = await CommentModel.findAll({
            where: { song_id: songId },
            include: {
                model: AccountModel,
                attributes: ["username"]
            }
        })

        res.status(200).json({ data: result, status: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getAllComment
}