import {GithubOutlined, MailOutlined} from "@ant-design/icons";
import {getBaseURL} from "@/common/url.utils";

export default function Home() {
    console.log(getBaseURL());
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Supported by 2023 IEEE YP-ITS Fellowship
                </p>
                <div
                    className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t
                    from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0
                        mr-3"
                        href="https://github.com/IEEE-ITSS-OpenHub/awesome-scenario-engineering"
                        target="_blank"
                        rel="noopener noreferrer">
                        <GithubOutlined/>
                    </a>
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="mailto:yun.tang@warwick.ac.uk"
                        target="_blank"
                        rel="noopener noreferrer">
                        <MailOutlined/>
                    </a>
                </div>
            </div>

            <div
                className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <h1 className={"text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white"}>Awesome
                    Scenario Engineering</h1>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                    href={getBaseURL() + "/papers"}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Papers{' '}
                        <span
                            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Papers about scenario engineering.
                    </p>
                </a>

                <a
                    href={getBaseURL() + "/codes"}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Codes{' '}
                        <span
                            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Repositories about scenario engineering.
                    </p>
                </a>
                <a
                    href={getBaseURL() + "/tools"}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Tools{' '}
                        <span
                            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Useful tools for scenario engineering.
                    </p>
                </a>

                <a
                    href={getBaseURL() + "/algorithms"}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Algorithms{' '}
                        <span
                            className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Popular algorithms for scenario engineering.
                    </p>
                </a>
            </div>
        </main>
    )
}
