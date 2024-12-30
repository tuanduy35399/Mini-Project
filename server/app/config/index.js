const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://tranhantgdd2020:Omcaydoitho2k4@cluster0.cdokk.mongodb.net/DKMH"
    }
};

module.exports = config;
