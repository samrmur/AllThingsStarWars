import { DocumentNode } from "graphql-typed";
export namespace SpeciesListQueryPartialData {
  export interface AllSpeciesEdgesNode {
    __typename?: "Species" | null;
    id?: string | null;
    name?: string | null;
    language?: string | null;
    classification?: string | null;
    designation?: string | null;
  }
  export interface AllSpeciesEdges {
    __typename?: "SpeciesEdge" | null;
    node?: SpeciesListQueryPartialData.AllSpeciesEdgesNode | null;
  }
  export interface AllSpeciesPageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
    endCursor?: string | null;
  }
  export interface AllSpecies {
    __typename?: "SpeciesConnection" | null;
    edges?: (SpeciesListQueryPartialData.AllSpeciesEdges | null)[] | null;
    pageInfo?: SpeciesListQueryPartialData.AllSpeciesPageInfo | null;
  }
}
export interface SpeciesListQueryPartialData {
  allSpecies?: SpeciesListQueryPartialData.AllSpecies | null;
}
export namespace SpeciesListQueryData {
  export interface Variables {
    first?: number | null;
    after?: string | null;
  }
  export interface AllSpeciesEdgesNode {
    __typename: "Species";
    id: string;
    name?: string | null;
    language?: string | null;
    classification?: string | null;
    designation?: string | null;
  }
  export interface AllSpeciesEdges {
    __typename: "SpeciesEdge";
    node?: SpeciesListQueryData.AllSpeciesEdgesNode | null;
  }
  export interface AllSpeciesPageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
    endCursor?: string | null;
  }
  export interface AllSpecies {
    __typename: "SpeciesConnection";
    edges?: (SpeciesListQueryData.AllSpeciesEdges | null)[] | null;
    pageInfo: SpeciesListQueryData.AllSpeciesPageInfo;
  }
}
export interface SpeciesListQueryData {
  allSpecies?: SpeciesListQueryData.AllSpecies | null;
}
declare const document: DocumentNode<SpeciesListQueryData, SpeciesListQueryData.Variables, SpeciesListQueryPartialData>;
export default document;