import { DocumentNode } from "graphql-typed";
export namespace CharacterListQueryPartialData {
  export interface AllPeopleEdgesNodeHomeworld {
    __typename?: "Planet" | null;
    name?: string | null;
  }
  export interface AllPeopleEdgesNodeSpecies {
    __typename?: "Species" | null;
    name?: string | null;
  }
  export interface AllPeopleEdgesNode {
    __typename?: "Person" | null;
    id?: string | null;
    name?: string | null;
    homeworld?: CharacterListQueryPartialData.AllPeopleEdgesNodeHomeworld | null;
    species?: CharacterListQueryPartialData.AllPeopleEdgesNodeSpecies | null;
    birthYear?: string | null;
  }
  export interface AllPeopleEdges {
    __typename?: "PeopleEdge" | null;
    node?: CharacterListQueryPartialData.AllPeopleEdgesNode | null;
  }
  export interface AllPeoplePageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
    endCursor?: string | null;
  }
  export interface AllPeople {
    __typename?: "PeopleConnection" | null;
    edges?: (CharacterListQueryPartialData.AllPeopleEdges | null)[] | null;
    pageInfo?: CharacterListQueryPartialData.AllPeoplePageInfo | null;
  }
}
export interface CharacterListQueryPartialData {
  allPeople?: CharacterListQueryPartialData.AllPeople | null;
}
export namespace CharacterListQueryData {
  export interface Variables {
    first?: number | null;
    after?: string | null;
  }
  export interface AllPeopleEdgesNodeHomeworld {
    __typename: "Planet";
    name?: string | null;
  }
  export interface AllPeopleEdgesNodeSpecies {
    __typename: "Species";
    name?: string | null;
  }
  export interface AllPeopleEdgesNode {
    __typename: "Person";
    id: string;
    name?: string | null;
    homeworld?: CharacterListQueryData.AllPeopleEdgesNodeHomeworld | null;
    species?: CharacterListQueryData.AllPeopleEdgesNodeSpecies | null;
    birthYear?: string | null;
  }
  export interface AllPeopleEdges {
    __typename: "PeopleEdge";
    node?: CharacterListQueryData.AllPeopleEdgesNode | null;
  }
  export interface AllPeoplePageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
    endCursor?: string | null;
  }
  export interface AllPeople {
    __typename: "PeopleConnection";
    edges?: (CharacterListQueryData.AllPeopleEdges | null)[] | null;
    pageInfo: CharacterListQueryData.AllPeoplePageInfo;
  }
}
export interface CharacterListQueryData {
  allPeople?: CharacterListQueryData.AllPeople | null;
}
declare const document: DocumentNode<CharacterListQueryData, CharacterListQueryData.Variables, CharacterListQueryPartialData>;
export default document;