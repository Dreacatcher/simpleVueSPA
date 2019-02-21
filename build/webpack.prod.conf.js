'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true,
			usePostCSS: true
		})
	},
	devtool: config.build.productionSourceMap ? config.build.devtool : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': env
		}),
	
		// extract css into its own file

		new MiniCssExtractPlugin({
			filename: 'css/app.[name].css',
			chunkFilename: 'css/app.[contenthash:12].css' // use contenthash *
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: config.build.productionSourceMap
				? { safe: true, map: { inline: false } }
				: { safe: true }
		}),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: config.build.index,
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// keep module.id stable when vendor modules does not change
		new webpack.HashedModuleIdsPlugin(),
		// enable scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		// split vendor js into its own file
		// copy custom static assets
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.build.assetsSubDirectory,
				ignore: [ '.*' ]
			}
		])
  ],
  mode: 'production'
})
webpackConfig.optimization = {
  runtimeChunk: {
    name: 'manifest'
  },
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: config.build.productionSourceMap,
			parallel: true
		}),
  ],
	splitChunks: {
		cacheGroups: {
			commons: {
				// 抽离自己写的公共代码
				chunks: 'async', // async针对异步加载的chunk做切割，initial针对初始chunk，all针对所有chunk。
				name: 'common', // 打包后的文件名，任意命名
				minChunks: 2, //最小引用2次
				minSize: 30000 // 只要超出30000字节就生成一个新包
			},
			vendor: {
				// 抽离第三方插件
				test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
				chunks: 'initial',
				name: 'vendor', // 打包后的文件名，任意命名
				priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
			}
		}
	}
	// runtimeChunk: true     // 持久缓存moduleID,ChunkID需要HashedModuleIdsPlugin等插件解决
}
webpackConfig.plugins.push(new VueLoaderPlugin())
if (config.build.productionGzip) {
	const CompressionWebpackPlugin = require('compression-webpack-plugin')

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

if (config.build.bundleAnalyzerReport) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
