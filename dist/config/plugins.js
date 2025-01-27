// ~/strapi-aws-s3/backend/config/plugins.js
module.exports = ({ env }) => ({
    documentation: {
        enabled: true,
    },
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                baseUrl: "https://minio.garnespratama.xyz/compro-rivandi",
                s3Options: {
                    credentials: {
                        accessKeyId: "Tm3MDviJ6aOBrjF5SKSC",
                        secretAccessKey: "7EuaAlAlhgKYe0Q3TXJHkZg0585NsZDeoVVZAovs",
                    },
                    endpoint: "https://minio.garnespratama.xyz",
                    region: "us-east-1",
                    forcePathStyle: true,
                    params: {
                        Bucket: "compro-rivandi",
                    },
                }
            },
        },
    },
});
