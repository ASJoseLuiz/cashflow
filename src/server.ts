import { App } from "./app";

class Server {
  static start(): void {
    const application = new App();
    application.listen();
  }
}

Server.start();
