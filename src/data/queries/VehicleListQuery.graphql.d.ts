import { DocumentNode } from "graphql-typed";
export namespace VehicleListQueryPartialData {
  export interface AllVehiclesEdgesNode {
    __typename?: "Vehicle" | null;
    id?: string | null;
    name?: string | null;
    vehicleClass?: string | null;
    model?: string | null;
  }
  export interface AllVehiclesEdges {
    __typename?: "VehiclesEdge" | null;
    node?: VehicleListQueryPartialData.AllVehiclesEdgesNode | null;
  }
  export interface AllVehiclesPageInfo {
    __typename?: "PageInfo" | null;
    hasNextPage?: boolean | null;
    endCursor?: string | null;
  }
  export interface AllVehicles {
    __typename?: "VehiclesConnection" | null;
    edges?: (VehicleListQueryPartialData.AllVehiclesEdges | null)[] | null;
    pageInfo?: VehicleListQueryPartialData.AllVehiclesPageInfo | null;
  }
}
export interface VehicleListQueryPartialData {
  allVehicles?: VehicleListQueryPartialData.AllVehicles | null;
}
export namespace VehicleListQueryData {
  export interface Variables {
    first?: number | null;
    after?: string | null;
  }
  export interface AllVehiclesEdgesNode {
    __typename: "Vehicle";
    id: string;
    name?: string | null;
    vehicleClass?: string | null;
    model?: string | null;
  }
  export interface AllVehiclesEdges {
    __typename: "VehiclesEdge";
    node?: VehicleListQueryData.AllVehiclesEdgesNode | null;
  }
  export interface AllVehiclesPageInfo {
    __typename: "PageInfo";
    hasNextPage: boolean;
    endCursor?: string | null;
  }
  export interface AllVehicles {
    __typename: "VehiclesConnection";
    edges?: (VehicleListQueryData.AllVehiclesEdges | null)[] | null;
    pageInfo: VehicleListQueryData.AllVehiclesPageInfo;
  }
}
export interface VehicleListQueryData {
  allVehicles?: VehicleListQueryData.AllVehicles | null;
}
declare const document: DocumentNode<VehicleListQueryData, VehicleListQueryData.Variables, VehicleListQueryPartialData>;
export default document;