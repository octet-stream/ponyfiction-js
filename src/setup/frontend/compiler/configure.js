import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin
} from "webpack"

import AssetsPlugin from "assets-webpack-plugin"
import PluginBabili from "babili-webpack-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import jeet from "jeet"
import rupture from "rupture"
import poststylus from "poststylus"
import requireHelper from "require-dir"

import dedent from "dedent"
import isFunction from "lodash/isFunction"
import objectIterator from "core/helper/util/objectIterator"

const ROOT = process.cwd()

function mapRules(rules, ...args) {
  const res = []

  for (const rule of objectIterator(rules)) {
    if (isFunction(rule)) {
      throw new TypeError("Rule module should return a function.")
    }

    res.push(rule.default(...args))
  }
}

function getPlugins(isDev) {
  const plugins = [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    }),

    new AssetsPlugin({
      path: `${ROOT}/config/runtime`,
      filename: "assets.json"
    }),

    new ExtractTextPlugin({
      disable: isDev,
      allChunks: true,
      filename: "css/[name]-[hash].css"
    }),

    new LoaderOptionsPlugin({
      options: {
        stylus: {
          ["include css"]: true,
          use: [
            jeet(),
            rupture(),
            poststylus([
              "autoprefixer"
            ])
          ]
        }
      }
    })
  ]

  if (isDev) {
    plugins.push(new HotModuleReplacementPlugin())
  } else {
    plugins.push(new PluginBabili({comments: false}))
  }

  return plugins
}

function getEntry(isDev, port) {
  const entry = {
    main: [
      `${ROOT}/frontend/core/base/main.js`
    ]
  }

  if (isDev) {
    entry.main = [
      "react-hot-loader/patch",

      dedent(
        `webpack-hot-middleware/client?path=http://localhost:${
          port
        }/__webpack_hmr&timeout=20000`
      ),

      ...entry.main
    ]
  }

  return entry
}

/**
 * Configure and return a webpack config for specified env
 *
 * @param boolean isDev
 * @param int port
 */
function configure(isDev, port) {
  const rules = mapRules(requireHelper("../rules"), isDev)
  const plugins = getPlugins(isDev)
  const entry = getEntry(isDev, port)

  const resolve = {
    alias: {},
    modules: [
      "node_modules",
      `${ROOT}/frontend`,
    ],
    extensions: [
      ".js", ".jsx", ".json",
      ".styl", ".css", ".svg"
    ]
  }

  const output = {
    path: `${ROOT}/public/assets`,
    publicPath: `http://localhost:${port}/assets/`,
    filename: "js/[name]-[hash].js"
  }

  const config = {
    devtool: isDev ? "eval-source-map" : "source-map",
    performance: {hints: isDev ? false : "warning"},
    module: {rules},

    plugins,
    resolve,
    entry,
    output
  }

  return config
}

export default configure