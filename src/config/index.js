const config = () => ({
  port: process.env.PORT || 8080,
  database: {
    uri: process.env.APP_DATABASE_URL,
    options: {},
  },
});

export default config;
