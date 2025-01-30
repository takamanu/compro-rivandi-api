export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 10737418240, // 10GB
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "minio.garnespratama.xyz",
            "minio.rivandi.blog",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "minio.garnespratama.xyz",
            "minio.rivandi.blog",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
