const maxPrice = document.querySelector("#maxPrice");
const output = document.querySelector("#maxPrice ~ output");
const containers = document.querySelectorAll(".container");
const information = document.querySelector(".information");
const form = document.querySelector("form");
const wholeFormBtn = document.querySelector(".whole");
const search = document.querySelector("#info-panel-search");

listTagsAndAttrs(form, information, 0);

output.textContent = maxPrice.value;

maxPrice.addEventListener("input", evt => output.textContent=maxPrice.value);

wholeFormBtn.addEventListener("click", evt => refillPanel(form));

containers.forEach(container => container.addEventListener("mouseover", evt => refillPanel(container)));

search.addEventListener("keyup", evt => {
  const regex = new RegExp(RegExp.escape(search.value), "gim");
  information.querySelectorAll("p, h3").forEach(element => {
    element.classList.remove("searched");
    if (element.textContent.search(regex) !== -1 && search.value !== "") element.classList.add("searched");
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
      listTagsAndAttrs(child, div, offset + 1);
    } else {
      const text = document.createElement("p");
      text.textContent = `Text Content : "${child.textContent}"`
      div.insertBefore(text, div.querySelector("p:first-of-type"));
    }

    div.style["margin-left"] = offset * 8 + "px";
    panel.appendChild(div);
  };
}

function refillPanel(container) {
  information.querySelectorAll("*").forEach(child => child.remove());
  if (container.children.length !== 0) listTagsAndAttrs(container, information, 0);
}

