const NODE_ENV = process.env.NODE_ENV || "dev";
const ENVS ={
    dev:{
        SECRET_KEY: "vsLGRtabym2OGiEeSHRm",
        db:{
            url: "mongodb://lpaczka:hola1997@ds011755.mlab.com:11755/rappi"
        }
    },
    test:{

    },
    production:{
        SECRET_KEY: process.env.SECRET_KEY,
        db:{
            url: process.env.MONGO_URL
        }
    }
};

module.exports = ENVS[NODE_ENV];