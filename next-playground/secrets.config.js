const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// remove .env.local file if it exists
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  fs.unlinkSync(envLocalPath);
}

const secretReferenceMap = new Map([
  ['AUTH0_SECRET', process.env.AUTH0_SECRET_REF],
  ['AUTH0_BASE_URL', process.env.AUTH0_BASE_URL_REF],
  ['AUTH0_ISSUER_BASE_URL', process.env.AUTH0_ISSUER_BASE_URL_REF],
  ['AUTH0_CLIENT_ID', process.env.AUTH0_CLIENT_ID_REF],
  ['AUTH0_CLIENT_SECRET', process.env.AUTH0_CLIENT_SECRET_REF],
  ['AUTH0_AUDIENCE', process.env.AUTH0_AUDIENCE_REF],
  ['EXTERNAL_API_SERVER_URL', process.env.EXTERNAL_API_SERVER_URL_REF],
]);

async function loadSecrets() {
  const client = new SecretManagerServiceClient();

  const secretLoaderPromises = [];

  secretReferenceMap.forEach((value, key) => {
    const accessSecretPromise = client.accessSecretVersion({
      name: `projects/${process.env.GCP_PROJECT}/secrets/${value}/versions/latest`,
    });

    secretLoaderPromises.push(accessSecretPromise);

    accessSecretPromise.then((response) => {
      const [secretData] = response;
      secretReferenceMap.set(key, secretData.payload.data.toString('utf8'));
    });
  });

  await Promise.all(secretLoaderPromises);

  fs.writeFileSync(path.resolve(__dirname, '.env.local'), Array.from(secretReferenceMap.entries()).map(([key, value]) => `${key}=${value}`).join('\n'));
}

loadSecrets();
