import { defineConfig } from "vite";

import React from "react";

export default defineConfig({
    test: {
        environment: "jsdom",
    },
});
