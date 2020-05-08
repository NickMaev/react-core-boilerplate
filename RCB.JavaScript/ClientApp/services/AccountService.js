import { ServiceBase } from "@Core/ServiceBase";
import SessionManager from "@Core/session";

export default class AccountService extends ServiceBase {
    
    async login(loginModel) {
        var result = await this.requestJson({
            url: "api/Account/Login",
            method: "POST",
            data: loginModel
        });

        if (!result.hasErrors) {
            SessionManager.setServiceUser(result.value);
        }

        return result;
    }

    async logout() {
        var result = await this.requestJson({
            url: "api/Account/Logout",
            method: "POST"
        });

        if (!result.hasErrors) {
            SessionManager.setServiceUser(null);
        }

        return result;
    }
}