import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { SERVERCONFIG } from "../model/app.constant";
import { AuthService } from './auth.service';

export class ServerConfig {
  API_BACKEND:string;
}

@Injectable()
export class ServerConfigService {

  constructor(private authService: AuthService){}
  
  private configuration: ServerConfig;

  setServerConfiguration(serverConfig: any[]) {
    const targetServer = serverConfig.find((x) => x.TARGET_SERVER == true);
    if (targetServer) this.configuration = targetServer;
    else console.log("error in setting configuration for the target server");
  }

  getServerConfiguration() {
    return this.configuration;
  }

  buildCompleteUrl(req: HttpRequest<any>) {
    let indexOfFirstSlash = req.url.indexOf("/");
    let basePath = req.url.substring(0, indexOfFirstSlash).trim().toUpperCase();
    let url = req.url.substring(indexOfFirstSlash, req.url.length);
    let baseUrl = this.getBaseUrl(basePath);
    return `${baseUrl}${url}`;
  }

  getBaseUrl(basePath: string) {
    const config = this.configuration;
    let baseUrl;
    switch (basePath) {
      case SERVERCONFIG.BACKEND:
        baseUrl = config.API_BACKEND;
        break;
      default:
        break;
    }
    return baseUrl;
  }
}
