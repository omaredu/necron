import axios from "axios";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  DocumentNode,
} from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";

interface GraphQLClientOptions {
  token?: string;
  fragments?: DocumentNode[];
}

class Client {
  static readonly API_URL = "https://5e6b-189-153-200-233.ngrok-free.app";
  private fragments: DocumentNode[] = [];

  private RESTClient = axios.create({
    baseURL: Client.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // @ts-ignore
  private GraphQLClient: ApolloClient<NormalizedCacheObject>;

  constructor(private token?: string) {
    if (this.token) {
      this.setToken(this.token);
    }
  }

  public getToken() {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    this.setGraphQLClientToken(token);
    this.setRESTClientToken(token);
  }

  public clearToken() {
    this.token = undefined;
    // @ts-ignore
    this.setGraphQLClientToken(undefined);
    // @ts-ignore
    this.setRESTClientToken(undefined);
  }

  public getClient<T extends "REST" | "GraphQL">(
    type: T,
  ): T extends "REST" ? typeof this.RESTClient : typeof this.GraphQLClient {
    switch (type) {
      case "REST":
        return this.RESTClient as any;
      case "GraphQL":
        return this.GraphQLClient as any;
      default:
        throw new Error("Invalid client type");
    }
  }

  public setFragments(fragments: DocumentNode[]) {
    this.fragments = fragments;
    this.GraphQLClient = this.createGraphQLClient({
      fragments,
      token: this.token,
    });
  }

  private setGraphQLClientToken(token: string) {
    this.GraphQLClient = this.createGraphQLClient({
      token,
      fragments: this.fragments,
    });
  }

  private setRESTClientToken(token: string) {
    this.RESTClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  private createGraphQLClient(
    options: GraphQLClientOptions,
  ): typeof this.GraphQLClient {
    return new ApolloClient({
      uri: `${Client.API_URL}/graphql`,
      cache: new InMemoryCache({
        ...(options.fragments && {
          fragments: createFragmentRegistry(...options.fragments),
        }),
      }),
      headers: {
        ...(options.token && { authorization: `Bearer ${options.token}` }),
      },
    });
  }
}

export default Client;
