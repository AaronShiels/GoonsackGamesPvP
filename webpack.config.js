import { dirname, resolve as resolvePath } from "path";
import { fileURLToPath } from "url";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const config = (env, { mode }) => {
	if (!mode) throw new Error("Mode not provided");
	const debugBuild = mode !== "production";
	const src = "./src/client";
	const dist = "./dist/client";
	var absRoot = dirname(fileURLToPath(import.meta.url));

	console.log(`Mode: ${debugBuild ? "Debug" : "Release"}`);
	console.log(`Root: ${absRoot}\nSource: ${src}\nDistributables: ${dist}`);

	const entry = `${src}/index.tsx`;

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
	const output = {
		filename: "app.[contenthash].js",
		path: absDist,
		publicPath: "/",
		clean: true
	};

	const htmlPluginConfig = new HtmlWebpackPlugin({
		template: "./src/client/index.html",
		templateParameters: {
			reactCdnUrl: `https://unpkg.com/react@18.2.0/umd/react${debugBuild ? ".development" : ".production.min"}.js`,
			reactDomCdnUrl: `https://unpkg.com/react-dom@18.2.0/umd/react-dom${debugBuild ? ".development" : ".production.min"}.js`,
			pixiCdnUrl: `https://unpkg.com/pixi.js@6.4.2/dist/browser/pixi${debugBuild ? "" : ".min"}.js`,
			deepstreamCdnUrl: `https://unpkg.com/@deepstream/client@6.0.5/dist/bundle/ds${debugBuild ? "" : ".min"}.js`
		}
	});
	// const copyPlugin = new CopyPlugin({ patterns: [{ from: "assets/*/*", context: "./src/client" }] });
	const plugins = [htmlPluginConfig /*, copyPlugin*/];

	const externals = {
		react: "React",
		"react-dom": "ReactDOM",
		// "react-router-dom": "ReactRouterDOM", TODO externalise
		"pixi.js": "PIXI",
		"@deepstream/client": "DeepstreamClient"
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
