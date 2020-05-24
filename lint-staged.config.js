module.exports = {
  "*.{js,jsx}": ["eslint", "git add"],
  "*.+(json|yml|yaml|css|less|scss|md|graphql|mdx)": [
    "prettier --write",
    "git add",
  ],
};
