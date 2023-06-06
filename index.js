import fs from "fs";

const file = fs.readFileSync("./sample-page.json", "utf8");
const {
  data: { ast: tree },
} = JSON.parse(file);

function treeTraverse(tree, parentHeadingLevel = 0, text = "") {
  console.log(tree.type);
  switch (tree.type) {
    // base cases
    case "text":
      text += tree.value;
      break;
    case "code":
      text += `\`\`\`${tree.lang}\n${tree.value}\n\`\`\`\n\n`;
      break;

    // recursive cases
    case "heading":
      console.log("heading");
      const currentHeadingLevel = parentHeadingLevel + 1;
      text += `${"#".repeat(currentHeadingLevel)} ${tree.children
        .map((child) => treeTraverse(child, currentHeadingLevel, text))
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

console.log(treeTraverse(tree));
