import { DocumentNode } from "graphql-typed";
export namespace StarshipListQueryPartialData {
  export interface AllStarshipsEdgesNode {
    __typename?: "Starship" | null;
    id?: string | null;
    name?: string | null;
    starshipClass?: string | null;
    model?: string | null;
  }
  export interface AllStarshipsEdges {
    __typename?: "StarshipsEdge" | null;
    node?: StarshipListQueryPartialData.AllStarshipsEdgesNode | null;
  }
  export interface AllStarshipsPageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
    endCursor?: string | null;
  }
  export interface AllStarships {
    __typename?: "StarshipsConnection" | null;
    edges?: (StarshipListQueryPartialData.AllStarshipsEdges | null)[] | null;
    pageInfo?: StarshipListQueryPartialData.AllStarshipsPageInfo | null;
  }
}
export interface StarshipListQueryPartialData {
  allStarships?: StarshipListQueryPartialData.AllStarships | null;
}
export namespace StarshipListQueryData {
  export interface Variables {
    first?: number | null;
    after?: string | null;
  }
  export interface AllStarshipsEdgesNode {
    __typename: "Starship";
    id: string;
    name?: string | null;
    starshipClass?: string | null;
    model?: string | null;
  }
  export interface AllStarshipsEdges {
    __typename: "StarshipsEdge";
    node?: StarshipListQueryData.AllStarshipsEdgesNode | null;
  }
  export interface AllStarshipsPageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
    endCursor?: string | null;
  }
  export interface AllStarships {
    __typename: "StarshipsConnection";
    edges?: (StarshipListQueryData.AllStarshipsEdges | null)[] | null;
    pageInfo: StarshipListQueryData.AllStarshipsPageInfo;
  }
}
export interface StarshipListQueryData {
  allStarships?: StarshipListQueryData.AllStarships | null;
}
declare const document: DocumentNode<StarshipListQueryData, StarshipListQueryData.Variables, StarshipListQueryPartialData>;
export default document;