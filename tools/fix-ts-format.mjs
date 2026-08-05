import fs from "fs";
import path from "path";

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(full);
        } else if (entry.name.endsWith(".ts")) {
            let text = fs.readFileSync(full, "utf8");

            text = text.replace(
                /(public|protected|private)\s+abstract\s*\n+\s*([A-Za-z_])/g,
                "$1 abstract $2"
            );

            text = text.replace(
                /(public|protected|private)\s+override\s*\n+\s*([A-Za-z_])/g,
                "$1 override $2"
            );

            text = text.replace(
                /abstract\s*\n+\s*([A-Za-z_])/g,
                "abstract $1"
            );

            text = text.replace(
                /override\s*\n+\s*([A-Za-z_])/g,
                "override $1"
            );

            fs.writeFileSync(full, text);
        }
    }
}

walk("src");
console.log("Done.");
