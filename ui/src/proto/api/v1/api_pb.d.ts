import * as jspb from "google-protobuf"

export class Cat extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getImageUrl(): string;
  setImageUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Cat.AsObject;
  static toObject(includeInstance: boolean, msg: Cat): Cat.AsObject;
  static serializeBinaryToWriter(message: Cat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Cat;
  static deserializeBinaryFromReader(message: Cat, reader: jspb.BinaryReader): Cat;
}

export namespace Cat {
  export type AsObject = {
    name: string,
    imageUrl: string,
  }
}

export class ListCatsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListCatsRequest): ListCatsRequest.AsObject;
  static serializeBinaryToWriter(message: ListCatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCatsRequest;
  static deserializeBinaryFromReader(message: ListCatsRequest, reader: jspb.BinaryReader): ListCatsRequest;
}

export namespace ListCatsRequest {
  export type AsObject = {
  }
}

export class ListCatsResponse extends jspb.Message {
  getCatsList(): Array<Cat>;
  setCatsList(value: Array<Cat>): void;
  clearCatsList(): void;
  addCats(value?: Cat, index?: number): Cat;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCatsResponse): ListCatsResponse.AsObject;
  static serializeBinaryToWriter(message: ListCatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCatsResponse;
  static deserializeBinaryFromReader(message: ListCatsResponse, reader: jspb.BinaryReader): ListCatsResponse;
}

export namespace ListCatsResponse {
  export type AsObject = {
    catsList: Array<Cat.AsObject>,
  }
}

export class GetFeaturedCatsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFeaturedCatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFeaturedCatsRequest): GetFeaturedCatsRequest.AsObject;
  static serializeBinaryToWriter(message: GetFeaturedCatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFeaturedCatsRequest;
  static deserializeBinaryFromReader(message: GetFeaturedCatsRequest, reader: jspb.BinaryReader): GetFeaturedCatsRequest;
}

export namespace GetFeaturedCatsRequest {
  export type AsObject = {
  }
}

export class GetFeaturedCatsResponse extends jspb.Message {
  getCatsList(): Array<Cat>;
  setCatsList(value: Array<Cat>): void;
  clearCatsList(): void;
  addCats(value?: Cat, index?: number): Cat;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFeaturedCatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFeaturedCatsResponse): GetFeaturedCatsResponse.AsObject;
  static serializeBinaryToWriter(message: GetFeaturedCatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFeaturedCatsResponse;
  static deserializeBinaryFromReader(message: GetFeaturedCatsResponse, reader: jspb.BinaryReader): GetFeaturedCatsResponse;
}

export namespace GetFeaturedCatsResponse {
  export type AsObject = {
    catsList: Array<Cat.AsObject>,
  }
}

export class CreateCatRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCatRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCatRequest): CreateCatRequest.AsObject;
  static serializeBinaryToWriter(message: CreateCatRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCatRequest;
  static deserializeBinaryFromReader(message: CreateCatRequest, reader: jspb.BinaryReader): CreateCatRequest;
}

export namespace CreateCatRequest {
  export type AsObject = {
    name: string,
  }
}

export class GetUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserRequest;
  static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
  export type AsObject = {
  }
}

export class GetUserResponse extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserResponse): GetUserResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserResponse;
  static deserializeBinaryFromReader(message: GetUserResponse, reader: jspb.BinaryReader): GetUserResponse;
}

export namespace GetUserResponse {
  export type AsObject = {
    email: string,
  }
}

