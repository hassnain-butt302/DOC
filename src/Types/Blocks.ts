export type BlockType =
  | "text"
  | "shortText"
  | "largeText"
  | "heading"
  | "radio"
  | "dropdown"
  | "checkbox"
  | "Signature";

export type Block = {
  id: string;
  type: BlockType;

  content?: string;

  headingLevel?: "h1" | "h2" | "h3";

  options?: string[];
  selectedOption?: string;

  signature?: string;
};