import { ServiceBase } from "@Services/ServiceBase";
import Result from "@Models/Result";
import { IPersonModel } from "@Models/IPersonModel";

export default class PersonService extends ServiceBase {
    public static async search(term: string = null): Promise<Result<IPersonModel[]>> {
        if (term == null) {
            term = "";
        }
        var result = await this.requestJson<IPersonModel[]>({
            url: `/api/Person/Search?term=${term}`,
            method: "GET"
        });
        return result;
    }
    public static async update(model: IPersonModel): Promise<Result<{}>> {
        var result = await this.requestJson({
            url: `/api/Person/${model.id}`,
            method: "PATCH",
            data: model
        });
        return result;
    }
    public static async delete(id: number): Promise<Result<{}>> {
        var result = await this.requestJson({
            url: `/api/Person/${id}`,
            method: "DELETE"
        });
        return result;
    }
    public static async add(model: IPersonModel): Promise<Result<number>> {
        var result = await this.requestJson<number>({
            url: "/api/Person/Add",
            method: "POST",
            data: model
        });
        return result;
    }
}