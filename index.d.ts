import {
  Update,
  error as TDError,
  Invoke,
  InvokeFuture,
  Execute
} from './types/tdlib'

export type On =
  & ((event: 'update', listener: (update: Update) => void) => Client)
  & ((event: 'error', listener: (err: TDError) => void) => Client)
  & ((event: 'destroy', listener: () => void) => Client)
  & ((event: 'auth-needed', listener: () => void) => Client)

export type Emit =
  & ((event: 'update', update: Update) => void)
  & ((event: 'error', err: TDError) => void)
  & ((event: 'destroy') => void)
  & ((event: 'auth-needed') => void)

export declare class Client {
  constructor(options?: ConfigType)
  connect: () => Promise<undefined>
  on: On
  once: On
  emit: Emit
  invoke: Invoke
  invokeFuture: InvokeFuture
  destroy: () => undefined
  setLogFilePath: (path: string) => number
  setLogMaxFileSize: (maxFileSize: number | string) => undefined
  setLogVerbosityLevel: (verbosity: number) => undefined
  setLogFatalErrorCallback: (fn: (errorMessage: string) => void) => undefined
  execute: Execute
}

export {
  Client as TDL,
  Client as Tdl
}

export default Client

// ---

export interface TDLibClient { readonly _TDLibClientBrand: void }

export declare class TDLib {
  constructor(libraryFile: string)
  create(): Promise<TDLibClient>
  destroy(client: TDLibClient): undefined
  execute(client: TDLibClient, query: Object): Object | null
  receive(client: TDLibClient, timeout: number): Promise<Object | null>
  send(client: TDLibClient, query: Object): Promise<null>
  setLogFilePath(path: string): number
  setLogMaxFileSize(maxFileSize: number | string): undefined
  setLogVerbosityLevel(verbosity: number): undefined
  setLogFatalErrorCallback(fn: (errorMessage: string) => void): undefined
}

// ---

export type TDLibParameters = {
  use_test_dc?: boolean,
  database_directory?: string,
  files_directory?: string,
  use_file_database?: boolean,
  use_chat_info_database?: boolean,
  use_message_database?: boolean,
  use_secret_chats?: boolean,
  api_id?: number,
  api_hash?: string,
  system_language_code?: string,
  device_model?: string,
  system_version?: string,
  application_version?: string,
  enable_storage_optimizer?: boolean,
  ignore_file_names?: boolean
}

export type LoginUser = {
  type: 'user',
  phoneNumber?: string,
  getAuthCode: (retry?: boolean) => Promise<string>,
  getPassword: (passwordHint: string, retry?: boolean) => Promise<string>,
  getName: () => Promise<{ firstName: string, lastName?: string }>
}

export type LoginBot = {
  type: 'bot',
  token: string
}

export type LoginDetails = Partial<LoginUser> | Partial<LoginBot>
export type StrictLoginDetails = LoginUser | LoginBot

export type ConfigType = {
  apiId?: number,
  apiHash?: string,
  loginDetails?: LoginDetails,
  binaryPath?: string,
  databaseDirectory?: string,
  filesDirectory?: string,
  logFilePath?: string,
  verbosityLevel?: number,
  skipOldUpdates?: boolean,
  dev?: boolean,
  useMutableRename?: boolean,
  tdlibParameters?: TDLibParameters,
  tdlibInstance?: TDLib
}

export type StrictConfigType = {
  apiId?: number,
  apiHash?: string,
  loginDetails: StrictLoginDetails,
  binaryPath: string,
  databaseDirectory: string,
  filesDirectory: string,
  logFilePath: string,
  verbosityLevel: number,
  skipOldUpdates: boolean,
  dev: boolean,
  useMutableRename: boolean,
  tdlibParameters: TDLibParameters,
  tdlibInstance?: TDLib
}
