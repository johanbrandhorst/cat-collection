/**
 * @fileoverview gRPC-Web generated client stub for catcollection.api.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  Cat,
  CreateCatRequest,
  GetFeaturedCatsRequest,
  GetFeaturedCatsResponse,
  GetUserRequest,
  GetUserResponse,
  ListCatsRequest,
  ListCatsResponse} from './api_pb';

export class CatServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoListCats = new grpcWeb.AbstractClientBase.MethodInfo(
    ListCatsResponse,
    (request: ListCatsRequest) => {
      return request.serializeBinary();
    },
    ListCatsResponse.deserializeBinary
  );

  listCats(
    request: ListCatsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ListCatsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/catcollection.api.v1.CatService/ListCats',
      request,
      metadata || {},
      this.methodInfoListCats,
      callback);
  }

  methodInfoGetFeaturedCats = new grpcWeb.AbstractClientBase.MethodInfo(
    GetFeaturedCatsResponse,
    (request: GetFeaturedCatsRequest) => {
      return request.serializeBinary();
    },
    GetFeaturedCatsResponse.deserializeBinary
  );

  getFeaturedCats(
    request: GetFeaturedCatsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GetFeaturedCatsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/catcollection.api.v1.CatService/GetFeaturedCats',
      request,
      metadata || {},
      this.methodInfoGetFeaturedCats,
      callback);
  }

  methodInfoCreateCat = new grpcWeb.AbstractClientBase.MethodInfo(
    Cat,
    (request: CreateCatRequest) => {
      return request.serializeBinary();
    },
    Cat.deserializeBinary
  );

  createCat(
    request: CreateCatRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Cat) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/catcollection.api.v1.CatService/CreateCat',
      request,
      metadata || {},
      this.methodInfoCreateCat,
      callback);
  }

  methodInfoGetUser = new grpcWeb.AbstractClientBase.MethodInfo(
    GetUserResponse,
    (request: GetUserRequest) => {
      return request.serializeBinary();
    },
    GetUserResponse.deserializeBinary
  );

  getUser(
    request: GetUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GetUserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/catcollection.api.v1.CatService/GetUser',
      request,
      metadata || {},
      this.methodInfoGetUser,
      callback);
  }

}

