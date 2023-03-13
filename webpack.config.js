const path = require('path');
const fs = require("fs");
const webpack = require('webpack');
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const job = async () => {

    const environment = process.env.NODE_ENV;
    console.log('environment:::::', environment);

    const ENVIRONMENT_VARIABLES = {};
    /*
        Use synchronous or asynchronous processes to load environment variables into
        the ENVIRONMENT_VARIABLES object here.
        E.g.
            1. Read .env files using fs in synchronous/asynchronous fashion
            2. Iterate over secrets asynchronously from Cloud Secret Manager.
    */

    const secret_name = "depl-aws-secrets";
    const client = new SecretsManagerClient({ region: "us-east-1" });
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        throw error;
    }

    const secret = response.SecretString;
    if (secret) {
        const obj = JSON.parse(secret);
        try {
            for (const [k, v] of Object.entries(obj)) {
                const updatedKey = `process.env.${k}`;
                ENVIRONMENT_VARIABLES[updatedKey] = v;
            }
        } catch (err) {
            console.log("Error occured, ", err);
        }
    }

    console.log(ENVIRONMENT_VARIABLES);

    return {
        entry: './src/index.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        target: 'node',
        output: {
            filename: 'api.bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new webpack.DefinePlugin(ENVIRONMENT_VARIABLES),
        ],
    };
}
module.exports = job;