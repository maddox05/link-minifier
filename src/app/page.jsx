import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Link Minifier</title>
        <meta name="Link Minifier" content="Shortens your URLs" />
        <link rel="icon" href="/code.png" />
      </Head>
      <main className="bg-gray-600 px-10 md:px-20 lg:px-40">
        <div>
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-xl font-mono transition duration-500 dark:text-white">
              link-minifier
            </h1>
            <ul className="flex items-center">
              <li>
                <a
                  className="transition hover:bg-pink-400 duration-500 bg-yellow-300
									text-white px-4 py-2 rounded-md ml-8"
                  href="#"
                >
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center p-20">
          <div className="p-24 bg-gray-500 w-1/2">
            <p></p>
            <form>
              <label>Link you want to minify: </label>
              <input type="text" className="text-black bg-white-400" />
              <button
                className="transition hover:bg-pink-400 duration-500 bg-yellow-300
									text-white px-4 py-2 rounded-md ml-8"
              >
                Minify!
              </button>
            </form>
            <h2></h2>
          </div>
        </div>
      </main>
      <footer className="flex justify-center p-10 bg-gray-500">
        <p>
          <a
            className="transition duration-500 text-yellow-300 hover:text-pink-400"
            href="https://github.com/maddox05/link-minifier"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
