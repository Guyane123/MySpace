import { BinaryLike, createHmac } from "crypto";

export const encrypt = {
    hash: (string: string) => {
        const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
        if (!ENCRYPTION_KEY) {
            return;
        }
        return createHmac("sha256", process.env.ENCRYPTION_KEY as BinaryLike)
            .update(string)
            .digest("hex");
    },
};
