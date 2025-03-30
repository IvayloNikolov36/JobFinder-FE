export class ValidationConstants {
    public static emailPattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    public static minNameLength: number = 2;
    public static maxNameLength: number = 25;
    public static passwordMinLength: number = 6;
    public static passwordMaxLength: number = 35;
    public static companyNameMinLength: number = 6;
    public static companyNameMaxLength: number = 60;
    public static bulstatMinLength: number = 9;
    public static bulstatMaxLength: number = 13;
}