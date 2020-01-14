

exports.currentUser = (req, res) => {
    return res.status(200).json(req.user);
}