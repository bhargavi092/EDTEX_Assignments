export interface UserRegister{
    role:string,
    name:string,
    phone:string,
    email:string,
    password:string,
    leaves:Leave[],
    numberOfLeaves:number,
}
export interface UserLogin{
    email:string,
    password:string,
}
export interface Leave{
    id:string,
    name:string,
    type:string,
    startDate:string,
    endDate:string,
    reason:string,
    status:string,
    managerReason:string,
}