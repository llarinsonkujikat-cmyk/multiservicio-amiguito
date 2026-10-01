"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./AppModule");
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Servidor backend escuchando en: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map