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

  ready() {
    // Polyfill IE11
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    if (!Array.prototype.findIndex) {
      Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate: any) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          let o = Object(this);
          let len = o.length >>> 0;
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          let thisArg = arguments[1];
          let k = 0;
          while (k < len) {
            let kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
              return k;
            }
            k++;
          }
          return -1;
        }
      });
    }

    super.ready();
  }

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

  regExpEscape(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  @Polymer
      .decorators.observe('searchTokens', 'heading') headingChanged(searchTokens: Array<string>, heading: string) {
    let sTokens = searchTokens.filter(o => o !== '');

    if (sTokens && sTokens.length > 0 && typeof heading !== 'undefined') {
      let regExPart = sTokens
                          .map((token: string) => {
                            return token.split('').map(o => this.regExpEscape(o)).join('[^string]*?');
                          })
                          .join('|');
      let regEx = new RegExp(regExPart, 'gi');
      let wordsToHighlight = heading.match(regEx) || [];
      let uniqueWordsToHighlight: Array<string> = [];

      wordsToHighlight.filter(function(item) {
        let i = uniqueWordsToHighlight.findIndex(x => x.toLowerCase() === item.toLowerCase());
        if (i <= -1)
          uniqueWordsToHighlight.push(item);
      });

      let highlightedHeading = heading;
      this.unique(wordsToHighlight).forEach((word: string) => {
        let replaceRegEx = new RegExp(`(?!<span[^>]*?>)(${this.regExpEscape(word)})(?![^<]*?<\/span>)`, 'gi');
        highlightedHeading = highlightedHeading.replace(replaceRegEx, `<span highlighted>${word}</span>`);
      });

      this.$.heading.innerHTML = highlightedHeading;
      return;
    }
    this.$.heading.innerHTML = heading;
  }

  private unique(a: Array<string>) {
    let uniqueWordsToHighlight: Array<string> = [];

    a.filter(function(item) {
      let i = uniqueWordsToHighlight.findIndex(x => x.toLowerCase() === item.toLowerCase());
      if (i <= -1)
        uniqueWordsToHighlight.push(item);
    });
    return uniqueWordsToHighlight;
  }
}