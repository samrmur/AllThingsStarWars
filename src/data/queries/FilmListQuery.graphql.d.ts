import { DocumentNode } from "graphql-typed";
export namespace FilmListQueryQueryPartialData {
  export interface AllFilmsEdgesNode {
    __typename?: "Film" | null;
    title?: string | null;
    episodeID?: number | null;
    producers?: (string | null)[] | null;
  }
  export interface AllFilmsEdges {
    __typename?: "FilmsEdge" | null;
    node?: FilmListQueryQueryPartialData.AllFilmsEdgesNode | null;
    cursor?: string | null;
  }
  export interface AllFilmsPageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
  }
  export interface AllFilms {
    __typename?: "FilmsConnection" | null;
    edges?: (FilmListQueryQueryPartialData.AllFilmsEdges | null)[] | null;
    pageInfo?: FilmListQueryQueryPartialData.AllFilmsPageInfo | null;
  }
}
export interface FilmListQueryQueryPartialData {
  allFilms?: FilmListQueryQueryPartialData.AllFilms | null;
}
export namespace FilmListQueryQueryData {
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
    node?: FilmListQueryQueryData.AllFilmsEdgesNode | null;
    cursor: string;
  }
  export interface AllFilmsPageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
  }
  export interface AllFilms {
    __typename: "FilmsConnection";
    edges?: (FilmListQueryQueryData.AllFilmsEdges | null)[] | null;
    pageInfo: FilmListQueryQueryData.AllFilmsPageInfo;
  }
}
export interface FilmListQueryQueryData {
  allFilms?: FilmListQueryQueryData.AllFilms | null;
}
declare const document: DocumentNode<FilmListQueryQueryData, FilmListQueryQueryData.Variables, FilmListQueryQueryPartialData>;
export default document;