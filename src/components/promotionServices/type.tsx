type FileMetaData = {
    name: string;
    size: number;
    fullPath: string;
    timeCreated: string | Date;
  };
  
  export interface FileContentType {
    downloadUrl: string;
    metadata: FileMetaData;
  }
  
  export type PromotionContentType = "heading" | "paragraph" | "image" | "list";
  export type PromotionContentInputType =
    | "text"
    | "textarea"
    | "file"
    | "multiple-input";
  
  export interface IPromotionContent {
    type: PromotionContentType;
    inputType: PromotionContentInputType;
    nanoId: string;
    listContent?: Array<string>;
    content?: string;
    fileContent?: FileContentType;
  }
  
  export interface PromotionInterface {
    _id: string;
    PromotionNanoId: string;
    title: string;
    shortIntroduction: string;
    thumbNail: FileContentType;
    publicationDate: string | Date;
    tag: string;
    PromotionContents: Array<IPromotionContent>;
  }
  
  export interface PromotionPost {
    _id: string | number;
    title: string;
    shortIntroduction: string;
    thumbNail: string;
    publicationDate: string | Date;
    tag: string;
  }
  