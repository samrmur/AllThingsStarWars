import { DocumentNode } from "graphql-typed";
export namespace PlanetListQueryPartialData {
  export interface AllPlanetsEdgesNode {
    __typename?: "Planet" | null;
    id?: string | null;
    name?: string | null;
    diameter?: number | null;
    population?: number | null;
  }
  export interface AllPlanetsEdges {
    __typename?: "PlanetsEdge" | null;
    node?: PlanetListQueryPartialData.AllPlanetsEdgesNode | null;
  }
  export interface AllPlanetsPageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
    endCursor?: string | null;
  }
  export interface AllPlanets {
    __typename?: "PlanetsConnection" | null;
    edges?: (PlanetListQueryPartialData.AllPlanetsEdges | null)[] | null;
    pageInfo?: PlanetListQueryPartialData.AllPlanetsPageInfo | null;
  }
}
export interface PlanetListQueryPartialData {
  allPlanets?: PlanetListQueryPartialData.AllPlanets | null;
}
export namespace PlanetListQueryData {
  export interface Variables {
    first?: number | null;
    after?: string | null;
  }
  export interface AllPlanetsEdgesNode {
    __typename: "Planet";
    id: string;
    name?: string | null;
    diameter?: number | null;
    population?: number | null;
  }
  export interface AllPlanetsEdges {
    __typename: "PlanetsEdge";
    node?: PlanetListQueryData.AllPlanetsEdgesNode | null;
  }
  export interface AllPlanetsPageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
    endCursor?: string | null;
  }
  export interface AllPlanets {
    __typename: "PlanetsConnection";
    edges?: (PlanetListQueryData.AllPlanetsEdges | null)[] | null;
    pageInfo: PlanetListQueryData.AllPlanetsPageInfo;
  }
}
export interface PlanetListQueryData {
  allPlanets?: PlanetListQueryData.AllPlanets | null;
}
declare const document: DocumentNode<PlanetListQueryData, PlanetListQueryData.Variables, PlanetListQueryPartialData>;
export default document;