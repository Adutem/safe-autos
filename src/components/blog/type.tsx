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
  
  export type BlogContentType = "heading" | "paragraph" | "image" | "list";
  export type BlogContentInputType =
    | "text"
    | "textarea"
    | "file"
    | "multiple-input";
  
  export interface IBlogContent {
    type: BlogContentType;
    inputType: BlogContentInputType;
    nanoId: string;
    listContent?: Array<string>;
    content?: string;
    fileContent?: FileContentType;
  }
  
  export interface BlogInterface {
    _id: string;
    blogNanoId: string;
    title: string;
    shortIntroduction: string;
    thumbNail: FileContentType;
    publicationDate: string | Date;
    tag: string;
    blogContents: Array<IBlogContent>;
  }
  
  export interface BlogPost {
    _id: string | number;
    title: string;
    shortIntroduction: string;
    thumbNail: string;
    publicationDate: string | Date;
    tag: string;
  }
  