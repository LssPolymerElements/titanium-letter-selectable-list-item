declare var Mark: any;

@Polymer.decorators.customElement('titanium-letter-selectable-list-item') class LetterSelectableListItem extends Polymer.DeclarativeEventListeners
(Polymer.Element) {
  @Polymer.decorators.property() item: any;

  @Polymer.decorators.property({notify: true, reflectToAttribute: true}) selected: boolean = false;

  @Polymer.decorators.property() heading: string;

  @Polymer.decorators.property() headingTokens: Array<string> = [];

  @Polymer.decorators.property() subHeading: string;

  @Polymer.decorators.property() elevation: number = 1;

  @Polymer.decorators.property() hideIcon: boolean;

  @Polymer.decorators.property() list: Object;

  @Polymer.decorators.property() disableSelection: boolean;

  @Polymer.decorators.property() searchTokens: Array<string> = [];

  @Polymer.decorators.query('heading') headingElement: HTMLElement;

  @Polymer
      .decorators.listen('tap', 'card') onCardTap(e: any) {
    e.stopPropagation();
    let options: any = {bubbles: true, composed: true, detail: {item: this.item, event: e}};
    this.dispatchEvent(new CustomEvent('card-tap', options));
  }

  @Polymer
      .decorators.listen('tap', 'card') toggleSelected(e: any) {
    if (this.disableSelection)
      return;

    let options: any = {bubbles: true, composed: true, detail: {item: this.item, selected: this.selected, event: e}};
    this.dispatchEvent(new CustomEvent('tap', options));
  }

  @Polymer
      .decorators.observe('searchTokens', 'heading') protected _onHeadingChanged(searchTokens: Array<string>, heading: string) {
    if (!searchTokens || !heading)
      return;

    this.headingElement.innerHTML = heading;
    const markInstance = new Mark(this.headingElement);
    searchTokens.forEach(o => {
      markInstance.mark(o, {separateWordSearch: true, element: 'span'});
    });
  }
}