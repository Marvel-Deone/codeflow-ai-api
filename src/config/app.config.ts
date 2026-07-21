export default () => ({
  app: {
    name: 'CodeFlow AI API',
    version: '1.0.0',
    port: parseInt(process.env.PORT ?? '3000', 10),
    environment: process.env.NODE_ENV ?? 'development',
    apiPrefix: 'api/v1',
  },
});