interface EnvironmentVariables {
  readonly NEXT_PUBLIC_KEY_SALT: string
  readonly NEXT_PUBLIC_API_APP: string
  readonly NEXT_PUBLIC_ENV: string
  readonly NEXT_PUBLIC_BUILD: string
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
