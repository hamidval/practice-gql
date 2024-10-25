

export class Helper 
{

    static getApolloError = (error:any) =>
    {
        return error.networkError.result.errors[0].message
    }
}