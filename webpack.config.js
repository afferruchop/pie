// Este archivo transforma a react a javascript

module.exports = {
  // ubicación del archivo que contiene el js
  entry: './src/app/index.js',
  output: {
    // salida del archivo que convierte
    path: __dirname + '/src/public',
    filename: 'bundle.js'
  },
  // configuración
  module:{
    rules: [
      // procesa archivos css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // procesa archivos js
      {
        use: 'babel-loader',
        // transforma todos los archivos javascript
        test: /\.js$/,
        // excluye los modulos de node
        exclude: /node_modules/ 
      }
    ]
  }
};