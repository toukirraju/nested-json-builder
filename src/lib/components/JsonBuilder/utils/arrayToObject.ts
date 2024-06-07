import { TreeNode } from "../context/BuilderProvider";


const arrayToObject = (array: TreeNode[], parent_id: string = "root"): { [key: string]: any } | null => {
    const parent = array.find((item) => item.name === parent_id);
    if (!parent) return null;

    const obj: { [key: string]: any } = {};

    parent.children?.forEach((childName: any) => {
        const child = array.find(
            (item) => item.name === childName && item.parentName === parent.name
        );
        if (child) {
            if (child.type === "object" || child.type === "array") {
                obj[childName] = arrayToObject(array, child.name);
            } else {
                obj[childName] = child.value;
            }
        }
    });

    return obj;
};

export default arrayToObject;
