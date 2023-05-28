import { dirname, resolve as resolvePath } from "path";
import { fileURLToPath } from "url";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const config = (_, { mode }) => {
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
	const cssLoaderRule = {
		test: /\.css$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader
			},
			{
				loader: "css-loader",
				options: {
					sourceMap: debugBuild
				}
			}
		]
	};
	const module = { rules: [tsLoaderRule, cssLoaderRule] };

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

	const htmlPluginConfig = new HtmlWebpackPlugin({ template: "./src/client/index.html" });
	const miniCssExtractPlugin = new MiniCssExtractPlugin({ filename: "styles.css" });
	// const copyPlugin = new CopyPlugin({ patterns: [{ from: "assets/*/*", context: "./src/client" }] });
	const plugins = [htmlPluginConfig, miniCssExtractPlugin /*, copyPlugin*/];

	return {
		entry,
		mode,
		devtool,
		resolve,
		module,
		output,
		plugins
	};
};

export default config;
