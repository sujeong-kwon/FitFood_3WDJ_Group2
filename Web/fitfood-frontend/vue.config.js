module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: "http://ec2-52-72-52-75.compute-1.amazonaws.com"
    }
};