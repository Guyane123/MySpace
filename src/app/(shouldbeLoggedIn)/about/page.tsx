import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About myspace",
    description: "About page, myspace",
};

export const dynamic = "force-static";

export default async function About() {
    return (
        <main>
            <h1>
                PïnkBerries is a social created by{" "}
                <a href="https://github.com/Guyane123"></a>
            </h1>
            <p>Nah fr !</p>
        </main>
    );
}
