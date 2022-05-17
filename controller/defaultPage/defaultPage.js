const homePage = async (req, res) => {
    res.status(200).send({
        message: " 👋 Welcome to my file app"
    })
}
module.exports = { homePage }
