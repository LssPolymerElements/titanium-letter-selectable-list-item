@customElement('titanium-letter-selectable-list-item')
class LetterSelectableListItem extends Polymer.GestureEventListeners(Polymer.Element) {
    @property()
    item: any;

    @property({ notify: true })
    selected: boolean = false;

    @property()
    heading: string;

    @property()
    headingTokens: Array<string> = [];

    @property()
    subHeading: string;

    @property()
    page: string = 'picture';

    @property()
    list: Object;

    @property()
    isSelectable: Boolean;

    @property()
    cursor: string = 'pointer';

    @property()
    searchTokens: Array<string> = [];

    @gestureListen('tap', 'card')
    onCardTap(e: any) {
        let options: any = { bubbles: true, composed: true, detail: e };
        this.dispatchEvent(new CustomEvent('card-tap', options));
    }

    @gestureListen('tap', 'icon-button')
    toggleSelected(e: any) {
        e.stopPropagation();
        let options: any = { bubbles: true, composed: true, detail: this.item };
        this.dispatchEvent(new CustomEvent('item-selected', options));
    }

    @observe('selected')
    private selectedChanged(value: any) {
        this.page = this.selected ? 'checkbox' : 'picture';
    }

    @computed('iconComputedStyle')
    private iconSelectable(isSelectable: boolean) {
        return isSelectable ? ' cursor: pointer' : '';
    }

    regExpEscape(s: string) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    @observe('searchTokens, heading')
    headingChanged(searchTokens: any, heading: string) {
        if (searchTokens && searchTokens.length > 0 && typeof heading !== 'undefined') {

            let regExPart = searchTokens.map((token: string) => {
                return token.split('').map(o => this.regExpEscape(o)).join('[^string]*?');
            }).join('|');
            let regEx = new RegExp(regExPart, 'gi');
            let wordsToHighlight = heading.match(regEx) || [];

            let uniqueWordsToHighlight: Array<string> = [];

            wordsToHighlight.filter(function (item) {
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
        }
        this.$.heading.innerHtml = [heading];
    }

    private unique(a: Array<string>) {
        let uniqueWordsToHighlight: Array<string> = [];

        a.filter(function (item) {
            let i = uniqueWordsToHighlight.findIndex(x => x.toLowerCase() === item.toLowerCase());
            if (i <= -1)
                uniqueWordsToHighlight.push(item);
        });
        return uniqueWordsToHighlight;
    }
}