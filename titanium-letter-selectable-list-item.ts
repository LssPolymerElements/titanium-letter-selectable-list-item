@customElement("titanium-letter-selectable-list-item")
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
    page: string = "picture";

    @property()
    list: Object;

    @property()
    isSelectable: Boolean;

    @property()
    cursor: string = "pointer";

    @property()
    searchTokens: Array<string> = []

    @gestureListen("tap", "card")
    onCardTap(e: any) {
        let options: any = { bubbles: true, composed: true, detail: e };
        this.dispatchEvent(new CustomEvent('card-tap', options));
    }

    @gestureListen("tap", "icon-button")
    toggleSelected(e: any) {
        e.stopPropagation();
        let options: any = { bubbles: true, composed: true, detail: this.item };
        this.dispatchEvent(new CustomEvent("item-selected", options));
    }

    @observe('selected')
    private selectedChanged(value: any) {
        this.page = this.selected ? "checkbox" : "picture";
    }

    @computed("iconComputedStyle")
    private iconSelectable(isSelectable: boolean) {
        return isSelectable ? " cursor: pointer" : "";
    }

    @observe('searchTokens, heading')
    headingChanged(searchTokens: any, heading: string) {
        if (searchTokens && searchTokens.length > 0 && typeof heading !== 'undefined') {

            var regEx = new RegExp(`(${searchTokens.join(")|(")})`, 'i');
            this.headingTokens = heading.split(regEx).filter(o => typeof o !== "undefined" && o !== "");
            return
        }
        this.headingTokens = [heading];
    }

    private isHighlighted(heading: string) {
        if (typeof heading != "string")
            return "";

        return this.searchTokens.some(o => o.toUpperCase() == heading.toUpperCase());
    }
}