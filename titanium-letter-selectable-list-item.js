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
        this.headingTokens = [];
        this.page = "picture";
        this.searchTokens = [];
    }
    ready() {
        super.ready();
        Polymer.Gestures.addListener(this, 'tap', (e) => this.tapHandler(e));
    }
    onCardTap(e) {
        console.log("Tapped");
        this.dispatchEvent(new CustomEvent('card-tap', e));
    }
    onHovered() {
        console.log("hovered called");
        this.page = "checkbox";
    }
    onUnhovered() {
        console.log("unhovered called");
        this.page = this.selected ? "checkbox" : "picture";
    }
    toggleSelected(e) {
        console.log("tap called");
        let options = { bubbles: true, composed: true };
        this.dispatchEvent(new CustomEvent(`${this.item}item-selected`, options));
    }
    selectedChanged(selected) {
        console.log("selectedchanged called");
        this.page = selected ? "checkbox" : "picture";
    }
    headingChanged(searchTokens, heading) {
        if (searchTokens && searchTokens.length > 0 && typeof heading !== 'undefined') {
            var regEx = new RegExp(`(${searchTokens.join(")|(")})`, 'i');
            this.headingTokens = heading.split(regEx).filter(o => typeof o !== "undefined" && o !== "");
            return;
        }
        this.headingTokens = [heading];
    }
    isHighlighted(heading) {
        if (typeof heading != "string")
            return "";
        return this.searchTokens.some(o => o.toUpperCase() == heading.toUpperCase());
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], LetterSelectableListItem.prototype, "item", void 0);
__decorate([
    property({ reflectToAttribute: true, notify: true }),
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
    __metadata("design:type", String)
], LetterSelectableListItem.prototype, "page", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], LetterSelectableListItem.prototype, "list", void 0);
__decorate([
    property(),
    __metadata("design:type", Array)
], LetterSelectableListItem.prototype, "searchTokens", void 0);
__decorate([
    listen("mouseup", "card"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "onCardTap", null);
__decorate([
    listen("mouseup", "icon-button"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "toggleSelected", null);
__decorate([
    observe('selected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "selectedChanged", null);
__decorate([
    observe('searchTokens, heading'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LetterSelectableListItem.prototype, "headingChanged", null);
LetterSelectableListItem = __decorate([
    customElement("titanium-letter-selectable-list-item")
], LetterSelectableListItem);
