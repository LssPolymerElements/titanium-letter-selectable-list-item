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
    searchTokens: Array<string> = []

    ready() {
        super.ready();
    }

    @gestureListen("tap", "card")
    onCardTap(e: any) {
        console.log("Tapped");
        let options: any = { bubbles: true, composed: true, detail: e };
        this.dispatchEvent(new CustomEvent('card-tap', options));
    }

    // @listen("mouseover", "icon-button")
    // onHovered() {
    //     console.log("hovered called")
    //     this.page = "checkbox";
    // }
    // @listen("mouseout", "icon-button")
    // onUnhovered() {
    //     console.log("unhovered called")
    //     this.page = this.selected ? "checkbox" : "picture";
    // }

    @gestureListen("tap", "icon-button")
    toggleSelected(e: any) {
        e.stopPropagation();
        console.log("tap called")
        let options: any = { bubbles: true, composed: true, detail: this.item };
        this.dispatchEvent(new CustomEvent("item-selected", options));
    }

    @observe('selected')
    private selectedChanged(value: any) {
        console.log("selectedchanged called")
        this.page = this.selected ? "checkbox" : "picture";
        console.log(this.selected + "--selected--ts");
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