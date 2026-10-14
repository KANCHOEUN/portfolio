const fs = require("fs"),
  path = require("path"),
  sharp = require(process.cwd() + "/node_modules/sharp");
async function walk(dir) {
  const result = {};
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) Object.assign(result, await walk(file));
    else if (/\.(png|jpe?g|webp|svg)$/.test(file)) {
      try {
        const { width, height } = await sharp(file).metadata();
        if (width && height)
          result["/" + file.replace(/^public\//, "")] = { width, height };
      } catch {}
    }
  }
  return result;
}
walk("public/images").then((data) =>
  fs.writeFileSync(
    "data/image-dimensions.ts",
    "// Intrinsic asset sizes; regenerate after adding images (see README).\nexport const imageDimensions: Record<string, { width: number; height: number }> = " +
      JSON.stringify(data, null, 2) +
      ";\n",
  ),
);
