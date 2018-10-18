import { Ui } from "@Ui";
import Result from "@Models/Result";
import Axios from "axios";
import { transformUrl } from "domain-wait";
import jsonToUrl from "json-to-url";

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

        var processQueryUrl = (url: string, data: any) : string => {
            if (data) {
                if (url.endsWith("/")) {
                    url = url.substring(0, url.length - 1);
                }
                return `${url}?${jsonToUrl(data)}`;
            }
            return `${opts.url}`;
        };

        try {
            switch (opts.method) {
            case "GET":
                axiosResult = await Axios.get(processQueryUrl(opts.url, opts.data));
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
                axiosResult = await Axios.delete(processQueryUrl(opts.url, opts.data));
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
