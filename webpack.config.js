module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: __dirname + '/public/js',
        filename: "[name].js"
    },
    devServer: {
        contentBase: __dirname + '/public',
        port: 8080,
        publicPath: '/js/'
    },
    devtool: '#inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            enforce: "pre",
            exclude: /node-modules/,
            loader: "eslint-loader"
        }, {
            test: /\.css$/,
            loader: ["eslint-loader", "css-loader"]
        }, {
            test: /\.js$/,
            exclude: /node-modules/,
            loader: ['babel-loader']
        }]
    }
};