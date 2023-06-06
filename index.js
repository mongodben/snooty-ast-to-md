import fs from "fs";

const file = fs.readFileSync("./sample-page.json", "utf8");
const {
  data: { ast: tree },
} = JSON.parse(file);

function treeTraverse(tree, parentHeadingLevel = 0, text = "") {
  switch (tree.type) {
    // base cases
    case "text":
      text += tree.value;
      break;
    case "code":
      text += `\`\`\`${tree.lang}\n${tree.value}\n\`\`\`\n\n`;
      break;

    // recursive cases
    case "section":
      if (tree.children[0].type === "heading") {
        parentHeadingLevel++;
      }
      text += `${tree.children
        .map((subtree) => treeTraverse(subtree, parentHeadingLevel))
        .join(" ")}\n\n`;
      break;
    case "heading":
      text += `${"#".repeat(parentHeadingLevel)} ${tree.children
        .map((child) => treeTraverse(child, parentHeadingLevel, text))
        .join(" ")}\n\n`;
      break;
    case "paragraph":
      text += `${tree.children
        .map((child) => treeTraverse(child, parentHeadingLevel))
        .join(" ")}\n\n`;
      break;

    default:
      text += tree.children
        .map((subtree) => treeTraverse(subtree, parentHeadingLevel))
        .join(" ");
      break;
  }

  return text;
}

const pathOut = "./sample-page.md";
const mdOut = treeTraverse(tree);
fs.writeFileSync(pathOut, mdOut);
console.log("wrote content to:", pathOut);
console.log("CONTENT:\n\n", mdOut);
