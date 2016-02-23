var webpack = require('webpack');  
module.exports = {  
    entry: [
      "./app/components/main.js"
    ],
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            { 
              test: /\.jsx?$/, 
              loaders:  'babel', 
              exclude: /node_modules/,
              query: {
                presets: ['react', 'es2015']
              }
            }   
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]

};