const maxPrice = document.querySelector("#maxPrice");
const output = document.querySelector("#maxPrice ~ output");
const containers = document.querySelectorAll(".container");
const information = document.querySelector(".information");

output.textContent = maxPrice.value;

maxPrice.addEventListener("input", evt => output.textContent=maxPrice.value);



containers.forEach(container => {
  container.addEventListener("mouseover", evt => {
    information.querySelectorAll("*").forEach(child => child.remove());
    listTagsAndAttrs(container, information, 0);
  });
});

function listTagsAndAttrs(container, panel, offset) {
  for (let child of container.children) {
    const div = document.createElement("div");
    const header = document.createElement("h3");
    header.textContent = child.tagName;
    div.appendChild(header);

    for (let attr of child.getAttributeNames()) {
      const para = document.createElement("p");
      para.textContent = attr + (child[attr] === undefined ? "" : ` :  ${child[attr]}`);
      div.appendChild(para);
    };
    
    if (child.children.length !== 0) {
      offset++;
      listTagsAndAttrs(child, div, offset + 1);
    } else {
      const text = document.createElement("p");
      text.textContent = `Text Content : "${child.textContent}"`
      div.insertBefore(text, div.querySelector("p:first-of-type"));
    }

    div.style["margin-left"] = offset * 4 + "px";
    panel.appendChild(div);
  };
}
