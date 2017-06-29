@customElement("titanium-letter-selectable-list-item")
class LetterSelectableListItem extends Polymer.GestureEventListeners(Polymer.Element) {
    @property()
    item: any;

    @property({ reflectToAttribute: true, notify: true })
    selected: boolean;

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
    searchTokens: Array<string> = []

    ready() {
        super.ready();
        Polymer.Gestures.addListener(this, 'tap', (e: any) => this.tapHandler(e));
    }

    @listen("tap", "card")
    onCardTap(e: any) {
        console.log("Tapped");
        this.dispatchEvent(new CustomEvent('card-tap', e));
    }


    onHovered() {
        console.log("hovered called")
        this.page = "checkbox";
    }

    onUnhovered() {
        console.log("unhovered called")
        this.page = this.selected ? "checkbox" : "picture";
    }

    @listen("tap", "icon-button")
    toggleSelected(e: any) {
        console.log("tap called")
        let options: any = { bubbles: true, composed: true };
        this.dispatchEvent(new CustomEvent(`${this.item}item-selected`, options));
        e.stopPropagation();
    }

    @observe('selected')
    private selectedChanged(selected: boolean) {
        console.log("selectedchanged called")
        this.page = selected ? "checkbox" : "picture";
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