import { dirname, resolve as resolvePath } from "path";
import { fileURLToPath } from "url";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";

const config = (env, { mode }) => {
	if (!mode) throw new Error("Mode not provided");
	const debugBuild = mode !== "production";
	const src = "./src/client";
	const dist = "./dist/client";
	var absRoot = dirname(fileURLToPath(import.meta.url));

	console.log(`Mode: ${debugBuild ? "Debug" : "Release"}`);
	console.log(`Root: ${absRoot}\nSource: ${src}\nDistributables: ${dist}`);

	const entry = `${src}/index.ts`;

	const devtool = debugBuild ? "source-map" : false;

	const tsLoaderRule = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: !debugBuild,
					configFile: "tsconfig.client.json"
				}
			}
		]
	};
	const module = { rules: [tsLoaderRule] };

	const resolveTypeScriptPlugin = new ResolveTypeScriptPlugin();
	const resolve = {
		extensions: [".tsx", ".ts", ".js"],
		plugins: [resolveTypeScriptPlugin]
	};

	var absDist = resolvePath(absRoot, dist);
	const output = { filename: "app.[contenthash].js", path: absDist, clean: true };

	const cdnUrlSuffix = debugBuild ? ".min" : "";
	const htmlPluginConfig = new HtmlWebpackPlugin({
		template: "./src/client/index.html",
		templateParameters: {
			pixiCdnUrl: `https://unpkg.com/pixi.js@6.4.2/dist/browser/pixi${cdnUrlSuffix}.js`,
			lodashCdnUrl: `https://unpkg.com/lodash@4.17.21/lodash${cdnUrlSuffix}.js`,
			deepstreamCdnUrl: `https://unpkg.com/@deepstream/client@6.0.5/dist/bundle/ds${cdnUrlSuffix}.js`
		}
	});
	const definePlugin = new webpack.DefinePlugin({ SERVER_HOST: JSON.stringify(env.SERVER_HOST) });
	// const copyPlugin = new CopyPlugin({ patterns: [{ from: "assets/*/*", context: "./src/client" }] });
	const plugins = [htmlPluginConfig, definePlugin /*, copyPlugin*/];

	const externals = {
		"pixi.js": "PIXI",
		"@deepstream/client": "DeepstreamClient",
		"lodash-es": "_"
	};

	return {
		entry,
		mode,
		devtool,
		resolve,
		module,
		output,
		plugins,
		externals
	};
};

export default config;
