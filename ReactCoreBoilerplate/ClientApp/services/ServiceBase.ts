import { Ui } from "@Ui";
import Result from "@Models/Result";
import Axios from "axios";
import { transformUrl } from "domain-wait";

export interface IRequestOptions {
    url: string;
    data?: any;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

export abstract class ServiceBase {

    public static async requestJson<T>(opts: IRequestOptions): Promise<Result<T>> {

        var axiosResult = null;
        var result = null;

        opts.url = transformUrl(opts.url); // Allow requests also for Node.

        try {
            switch (opts.method) {
            case "GET":
                axiosResult = await Axios.get(opts.url);
                break;
            case "POST":
                axiosResult = await Axios.post(opts.url, opts.data);
                break;
            case "PUT":
                axiosResult = await Axios.put(opts.url, opts.data);
                break;
            case "PATCH":
                axiosResult = await Axios.patch(opts.url, opts.data);
                break;
            case "DELETE":
                axiosResult = await Axios.delete(opts.url);
                break;
            }
            result = new Result(axiosResult.data.value, ...axiosResult.data.errors);
        } catch (error) {
            result = new Result(null, error.message);
        }
        
        if (result.hasErrors) {
            Ui.showErrors(...result.errors);
        }

        return new Promise(resolve => resolve(result)) as Promise<Result<T>>;
    }
}
