/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type ConfigStruct = {
  resetCallerEntityID: boolean;
  personaMirror: string;
};

export type ConfigStructOutput = [boolean, string] & {
  resetCallerEntityID: boolean;
  personaMirror: string;
};

export interface InitializeFacetInterface extends utils.Interface {
  contractName: "InitializeFacet";
  functions: {
    "initializeExternally((bool,address))": FunctionFragment;
    "registerAccessControllerExternally(address)": FunctionFragment;
    "registerContentCreatorExternally(address)": FunctionFragment;
    "registerEmbodiedSystemExternally(address,bytes4)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "initializeExternally", values: [ConfigStruct]): string;
  encodeFunctionData(functionFragment: "registerAccessControllerExternally", values: [string]): string;
  encodeFunctionData(functionFragment: "registerContentCreatorExternally", values: [string]): string;
  encodeFunctionData(functionFragment: "registerEmbodiedSystemExternally", values: [string, BytesLike]): string;

  decodeFunctionResult(functionFragment: "initializeExternally", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerAccessControllerExternally", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerContentCreatorExternally", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerEmbodiedSystemExternally", data: BytesLike): Result;

  events: {};
}

export interface InitializeFacet extends BaseContract {
  contractName: "InitializeFacet";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: InitializeFacetInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    initializeExternally(
      config: ConfigStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerAccessControllerExternally(
      accessControllerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerContentCreatorExternally(
      contentCreatorAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerEmbodiedSystemExternally(
      embodiedSystemAddr: string,
      selector: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  initializeExternally(
    config: ConfigStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerAccessControllerExternally(
    accessControllerAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerContentCreatorExternally(
    contentCreatorAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerEmbodiedSystemExternally(
    embodiedSystemAddr: string,
    selector: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    initializeExternally(config: ConfigStruct, overrides?: CallOverrides): Promise<void>;

    registerAccessControllerExternally(accessControllerAddr: string, overrides?: CallOverrides): Promise<void>;

    registerContentCreatorExternally(contentCreatorAddr: string, overrides?: CallOverrides): Promise<void>;

    registerEmbodiedSystemExternally(
      embodiedSystemAddr: string,
      selector: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    initializeExternally(
      config: ConfigStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerAccessControllerExternally(
      accessControllerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerContentCreatorExternally(
      contentCreatorAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerEmbodiedSystemExternally(
      embodiedSystemAddr: string,
      selector: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initializeExternally(
      config: ConfigStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerAccessControllerExternally(
      accessControllerAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerContentCreatorExternally(
      contentCreatorAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerEmbodiedSystemExternally(
      embodiedSystemAddr: string,
      selector: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}