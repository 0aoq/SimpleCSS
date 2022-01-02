// =========================================================================== //

export default `/* ================================= PROPERTIES =================================
 * Contains (mostly) all CSS properties that are commonly used.
 * Can be included in SimpleCSS files using the @includesub properties directive.
 * ============================================================================== */

/* margin */
@sub m -> margin;
@sub mb -> margin-bottom;
@sub ml -> margin-left;
@sub mr -> margin-right;
@sub mt -> margin-top;
/* padding */
@sub p -> padding;
@sub pb -> padding-bottom;
@sub pl -> padding-left;
@sub pr -> padding-right;
@sub pt -> padding-top;
/* dimensions */
@sub w -> width;
@sub h -> height;
/* border */
@sub b -> border;
@sub bt -> border-top;
@sub bl -> border-left;
@sub br -> border-right;
@sub bb -> border-bottom;
/* border-color */
@sub btc -> border-top-color;
@sub blc -> border-left-color;
@sub brc -> border-right-color;
@sub bbc -> border-bottom-color;
/* border-style */
@sub bts -> border-top-style;
@sub bls -> border-left-style;
@sub brs -> border-right-style;
@sub bbs -> border-bottom-style;
/* border-width */
@sub btw -> border-top-width;
@sub blw -> border-left-width;
@sub brw -> border-right-width;
@sub bbw -> border-bottom-width;
/* border-radius */
@sub btr -> border-top-left-radius;
@sub brr -> border-top-right-radius;
@sub bbr -> border-bottom-right-radius;
@sub blr -> border-bottom-left-radius;
/* background */
@sub bg -> background;
@sub bgc -> background-color;
@sub bgi -> background-image;
@sub bgp -> background-position;
@sub bgr -> background-repeat;
@sub bgs -> background-size;
/* font */
@sub f -> font;
@sub f-family -> font-family;
@sub f-size -> font-size;
@sub f-style -> font-style;
@sub f-weight -> font-weight;
/* text */
@sub t -> text;
@sub ta -> text-align;
@sub td -> text-decoration;
@sub ttm -> text-transform;
@sub ts -> text-shadow;
/* box shadow */
@sub bs -> box-shadow;
/* cursor */
@sub c -> cursor;
/* box-shadow */
@sub bs -> box-shadow;
/* color */
@sub clr -> color;
/* opacity */
@sub op -> opacity;
/* z-index */
@sub z -> z-index;
/* filter */
@sub fl -> filter;
/* animation */
@sub a -> animation;
@sub an -> animation-name;
@sub ad -> animation-duration;
@sub at -> animation-timing-function;
@sub aa -> animation-delay;
@sub ai -> animation-iteration-count;
@sub ad -> animation-direction;
@sub ap -> animation-play-state;
@sub af -> animation-fill-mode;
/* transition */
@sub tr -> transition;
@sub td -> transition-duration;
@sub trs -> transition-style;
/* transform */
@sub tr -> transform;
@sub trfs -> transform-style;
@sub trfo -> transform-origin;
/* grid */
@sub g -> grid;
@sub gda -> grid-area;
@sub gdac -> grid-auto-columns;
@sub gdaf -> grid-auto-flow;
@sub gdar -> grid-auto-rows;
@sub gdc -> grid-column;
@sub gdce -> grid-column-end;
@sub gdcg -> grid-column-gap;
@sub gdcs -> grid-column-start;
@sub gdg -> grid-gap;
@sub gdr -> grid-row;
@sub gdre -> grid-row-end;
@sub gdrg -> grid-row-gap;
@sub gdrs -> grid-row-start;
@sub gdt -> grid-template;
@sub gdta -> grid-template-areas;
@sub gdtc -> grid-template-columns;
@sub gdtr -> grid-template-rows;
/* flex */
@sub f -> flex;
@sub fd -> flex-direction;
@sub fw -> flex-wrap;
@sub fg -> flex-grow;
@sub fs -> flex-shrink;
@sub fb -> flex-basis;
@sub ff -> flex-flow;
/* positioning */
@sub pos -> position;
@sub js -> justify-self;
@sub jc -> justify-content;
@sub ji -> justify-items;
@sub ps -> place-self;
@sub pc -> place-content;
@sub pi -> place-items;
`

// =========================================================================== //