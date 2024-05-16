import { unsafeWindow } from "$";
import { createPortal } from "react-dom";
import AppMenuItem from "./components/app-menu-item";
import { useEffect } from "react";
import Results from "./components/results";

const menuItemContainer = document.createElement('li');
menuItemContainer.id = 'cfer-menu-item';

const resultsContainer = document.createElement('div');
resultsContainer.id = 'cfer-results';
resultsContainer.className = 'results-container';

const App = () => {
  const menu = <AppMenuItem />;
  const results = <Results />;

  useEffect(() => {
    console.info(`开始注入节点`);
    inject();
  }, []);
  
  function inject() {
    const menuItemExists = unsafeWindow.document.getElementById('cfer-menu-item');
    if (menuItemExists === null) {
      const topActions: HTMLUListElement | null = unsafeWindow.document.querySelector('ul.top-actions');
      if (topActions !== null) {
        topActions.append(menuItemContainer);
      }
    }

    const resultsExists = unsafeWindow.document.getElementById('cfer-results');
    if (resultsExists === null) {
      const searchPage: HTMLDivElement | null = unsafeWindow.document.querySelector('div.container.search-page');
      if (searchPage !== null) {
        const originResults: HTMLDivElement | null = searchPage.querySelector('div.results-container');
        if (originResults !== null) {
          originResults.id = 'origin-results';
          originResults.hidden = true;
        }
        searchPage.append(resultsContainer);
      }
    }
  }

  return (
    <>
      { createPortal(menu, menuItemContainer, 'menu') }
      { createPortal(results, resultsContainer, 'mod-list') }
    </>
  );
}

export default App;
