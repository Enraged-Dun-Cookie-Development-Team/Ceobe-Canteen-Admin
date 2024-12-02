// 过滤掉值为 null、undefined 或空字符串的字段
export function filterSearchParams(searchParams) {
    return Object.keys(searchParams).reduce((acc, key) => {
        if (searchParams[key] !== null && searchParams[key] !== undefined && searchParams[key] !== '') {
            acc[key] = searchParams[key];
        }
        return acc;
    }, {});
}