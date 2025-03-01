module.exports = ({ env }) => ({
    documentation: {
        enabled: true,
    },
    upload: {
        config: {
            provider: "aws-s3",
            providerOptions: {
                baseUrl: env("AWS_S3_ENDPOINT_URL") + "/" + env("AWS_BUCKET"),
                s3Options: {
                    credentials: {
                        accessKeyId: env("AWS_ACCESS_KEY_ID"),
                        secretAccessKey: env("AWS_ACCESS_SECRET"),
                    },
                    endpoint: env("AWS_S3_ENDPOINT_URL"),
                    region: env("AWS_REGION"),
                    forcePathStyle: true, // Pastikan ini tetap ada untuk MinIO atau endpoint custom
                    params: {
                        Bucket: env("AWS_BUCKET"),
                    },
                    httpOptions: {
                        timeout: 86400000, // 24 jam
                    },
                    maxRetries: 10,
                },
            },
            sizeLimit: 3 * 1024 * 1024 * 1024, // 3GB
        },
    },
});
