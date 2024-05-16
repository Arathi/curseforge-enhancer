import Mod from "../domains/mod";
import File from "../domains/file";
import { PaginationResponse } from "../domains/response";

export async function search(params?: Record<string, any>): Promise<PaginationResponse<Mod>> {
  const url = new URL(`https://www.curseforge.com/api/v1/mods/search`);
  if (params !== undefined) {
    Object.keys(params).forEach(name => {
      const value = params[name];
      url.searchParams.set(name, `${value}`);
    });
  }
  const resp = await fetch(url);
  const json = await resp.json();
  return json as PaginationResponse<Mod>;
}

export async function files(modId: number, params?: Record<string, any>): Promise<PaginationResponse<File>> {
  const url = new URL(`https://www.curseforge.com/api/v1/mods/${modId}/files`);
  if (params !== undefined) {
    Object.keys(params).forEach(name => {
      const value = params[name];
      url.searchParams.set(name, `${value}`);
    });
  }
  const resp = await fetch(url);
  const json = await resp.json();
  return json as PaginationResponse<File>;
}
