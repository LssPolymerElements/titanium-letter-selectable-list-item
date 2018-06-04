"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let LetterSelectableListItem = class LetterSelectableListItem extends Polymer.DeclarativeEventListeners(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.selected = false;
        this.headingTokens = [];
        this.elevation = 1;
        this.searchTokens = [];
    }
    onCardTap(e) {
        e.stopPropagation();
        let options = { bubbles: true, composed: true, detail: { item: this.item, event: e } };
        this.dispatchEvent(new CustomEvent('card-tap', options));
    }
    toggleSelected(e) {
        if (this.disableSelection)
            return;
        let options = { bubbles: true, composed: true, detail: { item: this.item, selected: this.selected, event: e } };
        this.dispatchEvent(new CustomEvent('tap', options));
    }
    _onHeadingChanged(searchTokens, heading) {
        if (!searchTokens || !heading)
            return;
        this.headingElement.innerHTML = heading;
        const markInstance = new Mark(this.headingElement);
        searchTokens.forEach(o => {
            markInstance.mark(o, { separateWordSearch: true, element: 'span' });
        });
    }
};
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Object)
], LetterSelectableListItem.prototype, "item", void 0);
__decorate([
    Polymer.decorators.property({ notify: true, reflectToAttribute: true }),
    __metadata("design:type", Boolean)
], LetterSelectableListItem.prototype, "selected", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", String)
], LetterSelectableListItem.prototype, "heading", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Array)
], LetterSelectableListItem.prototype, "headingTokens", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", String)
], LetterSelectableListItem.prototype, "subHeading", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Number)
], LetterSelectableListItem.prototype, "elevation", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Boolean)
], LetterSelectableListItem.prototype, "hideIcon", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Object)
], LetterSelectableListItem.prototype, "list", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Boolean)
], LetterSelectableListItem.prototype, "disableSelection", void 0);
__decorate([
    Polymer.decorators.property(),
    __metadata("design:type", Array)
], LetterSelectableListItem.prototype, "searchTokens", void 0);
__decorate([
    Polymer.decorators.query('heading'),
    __metadata("design:type", HTMLElement)
], LetterSelectableListItem.prototype, "headingElement", void 0);
__decorate([
    Polymer
        .decorators.listen('tap', 'card'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "onCardTap", null);
__decorate([
    Polymer
        .decorators.listen('tap', 'card'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "toggleSelected", null);
__decorate([
    Polymer
        .decorators.observe('searchTokens', 'heading'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "_onHeadingChanged", null);
LetterSelectableListItem = __decorate([
    Polymer.decorators.customElement('titanium-letter-selectable-list-item')
], LetterSelectableListItem);
//# sourceMappingURL=titanium-letter-selectable-list-item.js.map