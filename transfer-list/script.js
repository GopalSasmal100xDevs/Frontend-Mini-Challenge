let firstBoxList = [];
let secondBoxList = [];

const itemCount = { item1: 0, item2: 0 };
// Settings btn selectors
const allItemsRightBtn = document.querySelector("#all-right-btn");
const allItemsLeftBtn = document.querySelector("#all-left-btn");
const moveLeftBtn = document.querySelector("#left-btn");
const moveRightBtn = document.querySelector("#right-btn");

function saveList(list1, list2) {
  localStorage.setItem("list1", JSON.stringify(list1));
  localStorage.setItem("list2", JSON.stringify(list2));
}

function moveAllItemsToRight() {
  secondBoxList = [...secondBoxList, ...firstBoxList];
  uncheckAllItems(secondBoxList);
  firstBoxList = [];
  saveList(firstBoxList, secondBoxList);
  render();
}

function moveAllItemsToLeft() {
  firstBoxList = [...firstBoxList, ...secondBoxList];
  uncheckAllItems(firstBoxList);
  secondBoxList = [];
  saveList(firstBoxList, secondBoxList); // save changes
  render();
}

function uncheckAllItems(list) {
  list.forEach((_, index, arr) => {
    arr[index]["checked"] = false;
  });
}

function moveItemsLeft() {
  const selectedItems = secondBoxList.filter(({ checked }) => checked === true);
  firstBoxList = [...firstBoxList, ...selectedItems];
  secondBoxList = secondBoxList.filter(({ checked }) => checked === false);
  uncheckAllItems(firstBoxList);
  saveList(firstBoxList, secondBoxList);
  render();
}

function moveItemsRight() {
  const selectedItems = firstBoxList.filter(({ checked }) => checked === true);
  secondBoxList = [...secondBoxList, ...selectedItems];
  firstBoxList = firstBoxList.filter(({ checked }) => checked === false);
  uncheckAllItems(secondBoxList);
  saveList(firstBoxList, secondBoxList);
  render();
}

function uncheckItem(itemId, list) {
  list.forEach(({ id, checked }, index, arr) => {
    if (itemId === id) {
      arr[index]["checked"] = !checked;
    }
  });
  saveList(firstBoxList, secondBoxList);
  render();
}

function renderList(list, parent) {
  parent.innerHTML = "";
  list.forEach(({ title, checked, id }) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "list-item");
    listItem.setAttribute("key", id);

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "list-checkbox");

    if (checked) {
      checkBox.setAttribute("checked", "checked");
    }

    checkBox.addEventListener("change", () => uncheckItem(id, list));

    const listTitle = document.createElement("h4");
    listTitle.innerText = title;
    listTitle.setAttribute("id", id);

    listItem.appendChild(checkBox);
    listItem.appendChild(listTitle);

    parent.appendChild(listItem);
  });
  disableButton();
}

const settingsBtn = document.querySelector(".settings");
settingsBtn.addEventListener("click", (e) => {
  if (
    e.target.id == "all-right-btn" ||
    e.target.parentNode?.id == "all-right-btn"
  ) {
    moveAllItemsToRight();
  } else if (
    e.target.id == "all-left-btn" ||
    e.target.parentNode?.id == "all-left-btn"
  ) {
    moveAllItemsToLeft();
  } else if (
    e.target.id == "left-btn" ||
    e.target.parentNode?.id == "left-btn"
  ) {
    moveItemsLeft();
  } else if (
    e.target.id == "right-btn" ||
    e.target.parentNode?.id == "right-btn"
  ) {
    moveItemsRight();
  }
});

function render() {
  const firstBoxContainer = document.querySelector("#first-box");
  const secondBoxContainer = document.querySelector("#second-box");
  checkboxCount(firstBoxList, secondBoxList); // counting active checked items
  renderList(firstBoxList, firstBoxContainer);
  renderList(secondBoxList, secondBoxContainer);
}

function checkboxCount(list1, list2) {
  itemCount["item1"] = 0;
  itemCount["item2"] = 0;

  list1.forEach(({ checked }) => {
    if (checked) itemCount["item1"] += 1;
  });

  list2.forEach(({ checked }) => {
    if (checked) itemCount["item2"] += 1;
  });
}

function disableButton() {
  if (firstBoxList.length === 0) {
    allItemsRightBtn.setAttribute("disabled", "disabled");
  } else {
    allItemsRightBtn.removeAttribute("disabled");
  }

  if (secondBoxList.length === 0) {
    allItemsLeftBtn.setAttribute("disabled", "disabled");
  } else {
    allItemsLeftBtn.removeAttribute("disabled");
  }

  if (itemCount["item1"] === 0) {
    moveRightBtn.setAttribute("disabled", "disabled");
  } else {
    moveRightBtn.removeAttribute("disabled");
  }

  if (itemCount["item2"] === 0) {
    moveLeftBtn.setAttribute("disabled", "disabled");
  } else {
    moveLeftBtn.removeAttribute("disabled");
  }
}

(() => {
  const list1 = JSON.parse(localStorage.getItem("list1"));
  const list2 = JSON.parse(localStorage.getItem("list2"));
  firstBoxList = list1 ?? [
    { title: "JS", checked: true, id: 123123 },
    { title: "HTML", checked: false, id: 123124 },
    { title: "CSS", checked: true, id: 123125 },
    { title: "TS", checked: true, id: 122125 },
  ];

  secondBoxList = list2 ?? [
    { title: "React", checked: false, id: 1231123 },
    { title: "Angular", checked: false, id: 1232124 },
    { title: "Vue", checked: false, id: 1232125 },
    { title: "Svelte", checked: false, id: 193125 },
  ];
  render();
})();
