// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  base_url: 'http://s24.example.com:8000',
  sign_in_url: 'http://sso.example.com:4200',
  api_url: 'http://0.0.0.0:3000',
  google_client: '42075831752-9jf638265r2pirv7m31h141dnpf4hkas.apps.googleusercontent.com'
};