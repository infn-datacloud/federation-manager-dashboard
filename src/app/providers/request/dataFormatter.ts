type Input = Record<string, string>;
type Output = Record<string, any>;

// Helper function to handle nested structures
function setNestedValue(obj: any, path: string[], value: any) {
    const key: any = path.shift();
    if (path.length === 0) {
        obj[key] = value;
    } else {
        if (!obj[key]) obj[key] = isNaN(Number(path[0])) ? {} : [];
        setNestedValue(obj[key], path, value);
    }
}

export default function dataFormatter(input: Input): Output {
    const result: Output = {};

    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            const value = input[key];
            const parts = key.split('+');
            const valuePath = parts.slice(1);
            const baseKey = parts[0];

            if (valuePath.length === 0) {
                result[baseKey] = value;
            } else {
                // Handle array cases
                const lastPart = valuePath[valuePath.length - 1];
                const isArrayIndex = !isNaN(Number(lastPart));
                if (isArrayIndex) {
                    const arrayIndex = Number(lastPart);
                    const path = [...valuePath.slice(0, -1)];
                    const arrayKey = baseKey;
                    const array = result[arrayKey] || [];
                    setNestedValue(array, [String(arrayIndex)], value);
                    result[arrayKey] = array;
                } else {
                    // Handle nested objects
                    setNestedValue(result, [baseKey, ...valuePath], value);
                }
            }
        }
    }

    return result;
}