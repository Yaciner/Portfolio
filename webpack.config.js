const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const CompressionPlugin = require('compression-webpack-plugin');

const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;

const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const port = 3000;

const PATHS = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

const commonConfig = smp.wrap(merge([
  {
    entry: [path.join(PATHS.src, "css/style.css"), path.join(PATHS.src, "js/script.js")],
    output: {
      path: PATHS.dist,
      filename: `js/script.[hash].js`,
      publicPath: `/`
      // publicPath: `https://www.yacine.be/`
    },
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.html$/,
          loader: `html-loader`,
          options: {
            attrs: [
              `img:src`,
              `source:srcset`
            ]
          }
        },
        {
          test: /\.(jpe?g|png|gif|webp|svg)$/,
          use:[
            {
              loader: `file-loader`,
              options: {
                limit: 1000,
                context: `./src`,
                name: `[path][name].[ext]`
              }
            },{
              loader: `image-webpack-loader`,
              options: {
                bypassOnDebug: true,
                mozjpeg: {
                  progressive: true,
                  quality: 80
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
              },
            },
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: `babel-loader`
            },
            {
              loader: `eslint-loader`,
              options: {
                fix: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
    ],
    resolve: {
    // import files without extension import ... from './Test'
    extensions: [`.js`, `.jsx`, `.css`]
  },
  }
]));

const productionConfig = merge([
  parts.extractCSS(),
  {
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g)$/i ,
        plugins: [
          imageminJpegRecompress({})
        ]
      }),
      new CompressionPlugin({
        cache: true,
        algorithm: 'gzip'
      }),
      new CriticalPlugin({
        src: 'index.html',
        inline: true,
        minify: true,
        dest: 'index.html'
      })
    ]
  }
]);

const developmentConfig = merge([
  {
    devServer: {
      overlay: true,
      open: true,
      contentBase: PATHS.src,
      historyApiFallback: true
    }
  },
  parts.loadCSS(),
]);

module.exports = env => {
  if (process.env.NODE_ENV === "production") {
    console.log("building production");
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
