const fileModel = require('../../models/index').fileModel
const insert = async (data) => {
    try {
        const fileName = data.fileName
        const fileType = data.fileType
        const fileSize = data.fileSize
        const filePath = data.filePath

        let fileObj = new fileModel({
            fileName: fileName,
            fileType: fileType,
            fileSize: fileSize,
            filePath: filePath,
        })
        await fileObj.save()
    } catch (err) {
        console.log(err)
    }
}

const check = async (data) => {
    try {
        console.log(data)
        const condition = { fileName: data }
        let check = await fileModel.findOne(condition)
        console.log(check)
        if (check) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

const fetchFilesDetails = async (req) => {

    try {
        const page = req.query.pageIndex;
        const limit = req.query.perPage;
        const searchName = req.query.searchName;
        const searchType = req.query.searchType;
        const searchByType = req.query.searchByType;
        const searchByName = req.query.searchByName;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.order;
        var offset = '';
        var limt = '';
        if (page && limit) {
            offset = (page - 1) * limit;
            offset = parseInt(offset);
            limt = parseInt(limit);
        }
        let condition = {}
        let sortCondition = {}
        if (searchByName) {
            condition.fileName = { $regex: "" + searchName + "", $options: "i" }
        }
        if (searchByType) {
            condition.fileType = { $regex: "" + searchType + "", $options: "i" }
        }
        if (sortBy == 'fileSize') {
            sortCondition.fileSize = sortOrder
        }
        if (sortBy == 'fileName') {
            sortCondition.fileName = sortOrder
        }
        if (sortBy == 'uploadedDate') {
            sortCondition.updatedAt = sortOrder
        }

        let filesDetails = await fileModel.find(condition).skip(offset).limit(limt).sort(sortCondition)
        return filesDetails
    } catch (error) {
        console.log(error)
        throw new error

    }

}

module.exports = {
    insert: insert,
    check: check,
    fetchFilesDetails: fetchFilesDetails
}