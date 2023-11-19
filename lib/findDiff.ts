export default function diff(str1: string, str2: string) {
    const str = str1.split("");

    const diff = str
        .map((a, k) => {
            if (a != str2.charAt(k)) {
                return a;
            }
        })
        .join("");

    return diff;
}
