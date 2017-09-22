var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let LetterSelectableListItem = class LetterSelectableListItem extends Polymer.GestureEventListeners(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.selected = false;
        this.headingTokens = [];
        this.elevation = 1;
        this.searchTokens = [];
    }
    ready() {
        // Polyfill IE11
        // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
        if (!Array.prototype.findIndex) {
            Object.defineProperty(Array.prototype, 'findIndex', {
                value: function (predicate) {
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
    onCardTap(e) {
        e.stopPropagation();
        let options = { bubbles: true, composed: true, detail: { item: this.item, event: e } };
        this.dispatchEvent(new CustomEvent('card-tap', options));
    }
    toggleSelected(e) {
        if (this.disableSelection)
            return;
        if (this.selected)
            this.selected = false;
        else
            this.selected = true;
    }
    regExpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    headingChanged(searchTokens, heading) {
        let sTokens = searchTokens.filter(o => o !== '');
        if (sTokens && sTokens.length > 0 && typeof heading !== 'undefined') {
            let regExPart = sTokens.map((token) => {
                return token.split('').map(o => this.regExpEscape(o)).join('[^string]*?');
            }).join('|');
            let regEx = new RegExp(regExPart, 'gi');
            let wordsToHighlight = heading.match(regEx) || [];
            let uniqueWordsToHighlight = [];
            wordsToHighlight.filter(function (item) {
                let i = uniqueWordsToHighlight.findIndex(x => x.toLowerCase() === item.toLowerCase());
                if (i <= -1)
                    uniqueWordsToHighlight.push(item);
            });
            let highlightedHeading = heading;
            this.unique(wordsToHighlight).forEach((word) => {
                let replaceRegEx = new RegExp(`(?!<span[^>]*?>)(${this.regExpEscape(word)})(?![^<]*?<\/span>)`, 'gi');
                highlightedHeading = highlightedHeading.replace(replaceRegEx, `<span highlighted>${word}</span>`);
            });
            this.$.heading.innerHTML = highlightedHeading;
            return;
        }
        this.$.heading.innerHTML = heading;
    }
    unique(a) {
        let uniqueWordsToHighlight = [];
        a.filter(function (item) {
            let i = uniqueWordsToHighlight.findIndex(x => x.toLowerCase() === item.toLowerCase());
            if (i <= -1)
                uniqueWordsToHighlight.push(item);
        });
        return uniqueWordsToHighlight;
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], LetterSelectableListItem.prototype, "item", void 0);
__decorate([
    property({ notify: true }),
    __metadata("design:type", Boolean)
], LetterSelectableListItem.prototype, "selected", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], LetterSelectableListItem.prototype, "heading", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], LetterSelectableListItem.prototype, "headingTokens", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], LetterSelectableListItem.prototype, "subHeading", void 0);
__decorate([
    property(),
    __metadata("design:type", Number)
], LetterSelectableListItem.prototype, "elevation", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], LetterSelectableListItem.prototype, "hideIcon", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], LetterSelectableListItem.prototype, "list", void 0);
__decorate([
    property(),
    __metadata("design:type", Boolean)
], LetterSelectableListItem.prototype, "disableSelection", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], LetterSelectableListItem.prototype, "searchTokens", void 0);
__decorate([
    gestureListen('tap', 'card'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "onCardTap", null);
__decorate([
    gestureListen('tap', 'icon-container'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "toggleSelected", null);
__decorate([
    observe('searchTokens, heading'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "headingChanged", null);
LetterSelectableListItem = __decorate([
    customElement('titanium-letter-selectable-list-item')
], LetterSelectableListItem);
