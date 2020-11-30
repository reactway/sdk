/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { Compiler, RuleSetRule } from "webpack";
import path from "path";
import autoprefixer from "autoprefixer";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

export interface CSSPluginOptions {}

export class ReactwayCSSPlugin {
    constructor(protected readonly options: CSSPluginOptions = {}) {}

    public apply(compiler: Compiler): void {
        compiler.options.resolveLoader = compiler.options.resolveLoader ?? {};
        compiler.options.resolveLoader.modules = [
            ...(compiler.options.resolveLoader.modules ?? ["node_modules"]),
            path.resolve(__dirname, "../node_modules")
            // Testing with linking.
            // path.resolve(__dirname, "../../../node_modules")
        ];

        const rule: RuleSetRule = {
            test: /\.css$/i,
            use: [
                // MiniCssExtractPlugin.loader,
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [autoprefixer()],
                            sourceMap: true
                        }
                    }
                }
            ]
        };

        // Apply configuration
        compiler.hooks.afterEnvironment.tap(ReactwayCSSPlugin.name, () => {
            compiler.options.module = compiler.options.module ?? { rules: [] };
            if (compiler.options.module.rules == null) {
                compiler.options.module.rules = [];
            }

            compiler.options.module.rules.push(rule);
        });
    }
}
