export const clone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};
