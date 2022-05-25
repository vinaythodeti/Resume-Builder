import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerConfigService } from './server-config.service';

@Injectable()
export class AppInitializerService {
  constructor(
    private http: HttpClient,
    private serverConfigService: ServerConfigService
  ) {}

  loadServerConfig(): Promise<any> {
    return this.http
      .get("../../assets/config/server-configuration.json")
      .toPromise()
      .then((data: any[]) =>{
        console.log("data",data)
        return this.serverConfigService.setServerConfiguration(data)
      }).catch((err) => console.log("Server configuration not found."));
  }
}

export function serverConfigInitializerFactory(startupService: AppInitializerService): Function {
    return () => startupService.loadServerConfig();
}

