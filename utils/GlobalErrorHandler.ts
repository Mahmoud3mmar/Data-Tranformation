

/**
 * Generate a function that catches errors and calls the provided function.
 *
 * @param {Function} func - The function to be executed with error handling.
 * @return {Function} A function that executes the provided function with error handling.
 */
export const catchError =(func: { (req: any, res: any): Promise<void>; (arg0: any, arg1: any, arg2: any): Promise<any> })=>{

    return(req: any,res: any,next: (arg0: any) => void)=>{
        func(req,res,next).catch((error)=>{
            next(error)
        })
    }




}


export class AppError extends Error{
    status: any;
    constructor(message: string | undefined,status: any){
        super(message)
        this.status = status
    }

}