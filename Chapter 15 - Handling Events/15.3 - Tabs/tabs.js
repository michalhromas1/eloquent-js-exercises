const TAB_NAME_ATTR = 'data-tabname';
const BTN_TAB_ATTR = 'data-tab';
const ACTIVE_CLASS = 'active';

asTabs(document.querySelector('tab-panel'));

function asTabs(tabsParent) {
  const tabs = tabsParent.children;
  const buttons = [];

  for (const tab of tabs) {
    tab.classList.remove(ACTIVE_CLASS);
    buttons.push(createButton(tab));
  }

  buttons[0].classList.add(ACTIVE_CLASS);
  tabs[0].classList.add(ACTIVE_CLASS);

  tabsParent.prepend(...buttons);
}

function createButton(tabContent) {
  const tabName = tabContent.getAttribute(TAB_NAME_ATTR);
  const button = document.createElement('button');

  button.innerText = tabName;
  button.setAttribute(BTN_TAB_ATTR, tabName);
  button.addEventListener('click', onButtonClick);

  return button;
}

function onButtonClick(e) {
  e.preventDefault();
  const clickedButton = e.target;

  if (clickedButton.classList.contains(ACTIVE_CLASS)) {
    return;
  }

  const activeTab = document.querySelector(`[${TAB_NAME_ATTR}].${ACTIVE_CLASS}`);
  activeTab.classList.remove(ACTIVE_CLASS);

  const activeButton = document.querySelector(`[${BTN_TAB_ATTR}].${ACTIVE_CLASS}`);
  activeButton.classList.remove(ACTIVE_CLASS);

  const linkedTabName = clickedButton.getAttribute(BTN_TAB_ATTR);
  const linkedTab = document.querySelector(`[${TAB_NAME_ATTR}="${linkedTabName}"]`);

  linkedTab.classList.add(ACTIVE_CLASS);
  clickedButton.classList.add(ACTIVE_CLASS);
}
