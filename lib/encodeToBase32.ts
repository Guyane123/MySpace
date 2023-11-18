export const base32 = {
    encode: function (input: string): string {
        const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

        let result = "";
        let bits = 0;
        let bitsCount = 0;

        for (let i = 0; i < input.length; i++) {
            bits = (bits << 8) | input.charCodeAt(i);
            bitsCount += 8;

            while (bitsCount >= 5) {
                bitsCount -= 5;
                result += base32Chars[(bits >>> bitsCount) & 0x1f];
            }
        }

        if (bitsCount > 0) {
            bits = bits << (5 - bitsCount);
            result += base32Chars[bits & 0x1f];
        }

        // Add padding if necessary
        // while (result.length % 8 !== 0) {
        //     result += "=";
        // }

        return result;
    },
    hello: () => console.log("hello"),
};
