import Result from "@Core/Result";
import { ILoginModel } from "@Models/ILoginModel";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";

export default class AccountService extends ServiceBase {
    
    public async login(loginModel: ILoginModel) : Promise<Result<IServiceUser>> {
        var result = await this.requestJson<IServiceUser>({
            url: "api/Account/Login",
            method: "POST",
            data: loginModel
        });

        if (!result.hasErrors) {
            SessionManager.setServiceUser(result.value);
        }

        return result;
    }

    public async logout(): Promise<Result<{}>> {
        var result = await this.requestJson<IServiceUser>({
            url: "api/Account/Logout",
            method: "POST"
        });

        if (!result.hasErrors) {
            SessionManager.setServiceUser(null);
        }

        return result;
    }
}