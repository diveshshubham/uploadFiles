const fs = require('fs')
const uploadFile = require("../../middleware/index").upload.uploadFileMiddleware;
const queryService = require('../../services/queryService/queryService')
const baseUrl = "http://localhost:8086/files/";


/**
   * Use to upload file to destination and saving details to db
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        } else if (await queryService.check(req.file.originalname)) {
            return res.status(400).send({ message: "file Already Uploaded" });
        } else {
            let data = {}

            data.fileName = req.file.originalname
            data.fileType = req.file.mimetype
            data.fileSize = (req.file.size) / 1024
            data.filePath = req.file.path

            queryService.insert(data)

            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
        }

    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file -  ${err}`,
        });
    }
};

/**
  * Use to get files and url from directory to download file
  * @param {Object} res
  * @returns {Object} Response
  */
const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/public/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        let fileInfos = [];
        console.log(files)
        files.forEach((file) => {
           
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    });
};

/**
   * Use to get file details from db with sorting, search etc functionality
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
const getFilesDetailsList = async (req, res) => {

    let queryData = await queryService.fetchFilesDetails(req)
    const response = {
        message: "success",
        totalCount: queryData.length,
        data: queryData
    }
    res.status(200).send(response);

};


/**
   * Use to download file from the directory 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/public/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Download error" + err,
            });
        }
    });
};
module.exports = {
    upload,
    getListFiles,
    download,
    getFilesDetailsList
};