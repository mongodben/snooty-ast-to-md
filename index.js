import fs from "fs";

const file = fs.readFileSync("./sample-page.json", "utf8");
const {
  data: { ast },
} = JSON.parse(file);

const baseUrl = "https://www.mongodb.com/docs/manual/";

function treeTraverse(tree, parentHeadingLevel = 0, text = "") {
  switch (tree.type) {
    // base cases
    case "text":
      text += tree.value;
      break;
    case "code":
      text += `\`\`\`${tree.lang}\n${tree.value}\n\`\`\`\n\n`;
      break;

    // recursive block cases
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

    // recursive inline cases
    case "literal":
      text += `\`${tree.children
        .map((child) => treeTraverse(child, parentHeadingLevel))
        .join(" ")}\``;
      break;
    case "ref_role":
      let url = "#"; // default if ref_role is something unexpected
      if (tree.fileid !== undefined && Array.isArray(tree.fileid)) {
        const [path, anchor] = tree.fileid;
        url = `${baseUrl}${path}/#${anchor}`;
      } else if (tree.url && typeof tree.url === "string") {
        url = tree.url;
      }

      text += `[${tree.children
        .map((child) => treeTraverse(child, parentHeadingLevel))
        .join(" ")}](${url})`;
      break;

    // TODO: bold and italic cases

    default:
      text += tree.children
        .map((subtree) => treeTraverse(subtree, parentHeadingLevel))
        .join(" ");
      break;
  }

  return text;
}

const pathOut = "./sample-page.md";
const mdOut = treeTraverse(ast);
fs.writeFileSync(pathOut, mdOut);
console.log("wrote content to:", pathOut);
console.log("CONTENT:\n\n", mdOut);
