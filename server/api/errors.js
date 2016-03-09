module.exports = {
    DBConnection: function(res) {
        res.status(500).json({error: 'Database Connection Error'});
    },
    SomethingWentHorriblyWrong: function(res) {
        res.status(500).json({error: 'Something Went Horribly Wrong'});
    },
    Unauthorized: function(res) {
        res.status(401).json({error: 'Unauthorized Access'});
    },
    InvalidData: function(res) {
        res.status(400).json({error: 'Invalid Data'});
    },
    Custom: function(res, status, message) {
        res.status(status).json({error: message})
    }
};