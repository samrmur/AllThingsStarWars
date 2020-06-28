import { DocumentNode } from "graphql-typed";
export namespace FilmListQueryPartialData {
  export interface AllFilmsEdgesNode {
    __typename?: "Film" | null;
    title?: string | null;
    episodeID?: number | null;
    producers?: (string | null)[] | null;
  }
  export interface AllFilmsEdges {
    __typename?: "FilmsEdge" | null;
    node?: FilmListQueryPartialData.AllFilmsEdgesNode | null;
    cursor?: string | null;
  }
  export interface AllFilmsPageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
  }
  export interface AllFilms {
    __typename?: "FilmsConnection" | null;
    edges?: (FilmListQueryPartialData.AllFilmsEdges | null)[] | null;
    pageInfo?: FilmListQueryPartialData.AllFilmsPageInfo | null;
  }
}
export interface FilmListQueryPartialData {
  allFilms?: FilmListQueryPartialData.AllFilms | null;
}
export namespace FilmListQueryData {
  export interface Variables {
    first?: number | null;
    after?: string | null;
  }
  export interface AllFilmsEdgesNode {
    __typename: "Film";
    title?: string | null;
    episodeID?: number | null;
    producers?: (string | null)[] | null;
  }
  export interface AllFilmsEdges {
    __typename: "FilmsEdge";
    node?: FilmListQueryData.AllFilmsEdgesNode | null;
    cursor: string;
  }
  export interface AllFilmsPageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
  }
  export interface AllFilms {
    __typename: "FilmsConnection";
    edges?: (FilmListQueryData.AllFilmsEdges | null)[] | null;
    pageInfo: FilmListQueryData.AllFilmsPageInfo;
  }
}
export interface FilmListQueryData {
  allFilms?: FilmListQueryData.AllFilms | null;
}
declare const document: DocumentNode<FilmListQueryData, FilmListQueryData.Variables, FilmListQueryPartialData>;
export default document;