import { Component } from '../core/component';

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);

    this.tabs = [];
  }

  registerTabs(tabs) {
    this.tabs = tabs;
  }

  init() {
    this.$el.addEventListener('click', tabClickHandler.bind(this));
  }
}

function tabClickHandler(e) {
  e.preventDefault();
  if (e.target.classList.contains('tab')) {
    // Array.from()
    this.$el.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('active');
    });
    e.target.classList.add('active');

    const activeTab = this.tabs.find(
      (tab) => tab.name === e.target.dataset.name
    );
    this.tabs.forEach((tab) => tab.component.hide());
    activeTab.component.show();
  }
}
