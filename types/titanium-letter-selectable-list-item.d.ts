declare var Mark: any;
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
    headingElement: HTMLElement;
    onCardTap(e: any): void;
    toggleSelected(e: any): void;
    protected _onHeadingChanged(searchTokens: Array<string>, heading: string): void;
}
