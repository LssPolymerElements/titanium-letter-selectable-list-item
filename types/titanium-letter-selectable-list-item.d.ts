declare const LetterSelectableListItem_base: typeof Polymer.Element & Polymer.DeclarativeEventListenersConstructor;
declare class LetterSelectableListItem extends LetterSelectableListItem_base {
    item: any;
    selected: boolean;
    heading: string;
    headingTokens: Array<string>;
    subHeading: string;
    elevation: number;
    hideIcon: boolean;
    list: Object;
    disableSelection: boolean;
    searchTokens: Array<string>;
    ready(): void;
    onCardTap(e: any): void;
    toggleSelected(e: any): void;
    regExpEscape(s: string): string;
    headingChanged(searchTokens: Array<string>, heading: string): void;
    private unique(a);
}
