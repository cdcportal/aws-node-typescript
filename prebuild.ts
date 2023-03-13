import path from 'path';
import fs from "fs";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const job = async () => {
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
    if (secret){
        const obj = JSON.parse(secret);
        let envContent = "";
        try {
            for (const [k, v] of Object.entries(obj)) {
                envContent += (k + "=" + v + "\n");
            }
        } catch (err) {
            console.log("Error occured, ", err);
        }
        fs.writeFileSync('./.env', envContent);
    }
  }

job();