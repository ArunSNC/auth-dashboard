export interface login{
    username: string,
    role: string,
    email: string,
    token: string,
    expiresIn: number,
    message: string,
    success: boolean
}