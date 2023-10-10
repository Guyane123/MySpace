"use server";
import { cookies } from "next/headers";

export default async function setCookie(name: string, value: string) {
    cookies().set(name, value);
}
export async function getCookie(name: string): Promise<String> {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value.toString()!;
}
