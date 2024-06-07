const objectToArray = (obj: any, parentName = "root", depth = 1) => {
    let initParent;

    if (depth === 1) {
        initParent = {
            name: "root",
            parentName: null,
            objectName: "",
            children: Object.keys(obj),
        };
    }

    const keys = Object.keys(obj);
    const values = Object.values(obj);

    let result: any = [];
    if (initParent) {
        result = [initParent];
    }

    keys.forEach((key, index) => {
        if (typeof values[index] === "object") {
            result.push({
                name: key,
                parentName: parentName,
                type: "object",
                children: Object.keys(values[index] as object),
            });
            result.push(...objectToArray(values[index], key, depth + 1));
        } else {
            result.push({
                name: key,
                parentName: parentName,
                type: "string",
                value: values[index],
            });
        }
    });

    return result;
};

export default objectToArray;