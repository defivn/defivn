import A from "./a";
import Blockquote from "./blockquote";
import H1 from "./h1";
import H2 from "./h2";
import H3 from "./h3";
import H4 from "./h4";
import H5 from "./h5";
import Code from "./code";
import Img from "./img";
import OL from "./ol";
import P from "./p";
import Table from "./table";
import TD from "./td";
import TH from "./th";
import TR from "./tr";
import UL from "./ul";
import TOC from "./toc";

export const mdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    p: P,
    img: Img,
    blockquote: Blockquote,
    ul: UL,
    ol: OL,
    a: A,
    table: Table,
    tr: TR,
    td: TD,
    th: TH,
    code: Code,
    TOC: TOC,
}
