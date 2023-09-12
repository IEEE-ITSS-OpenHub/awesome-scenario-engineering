/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import {FC, useEffect, useState} from 'react';
import React from 'react';
import yaml from 'js-yaml';
import {getBaseURL} from "@/common/url.utils";
import {Divider, Input, FloatButton} from 'antd';
import {GithubOutlined, HomeOutlined} from "@ant-design/icons";
import {getTextColor} from "@/common/color.utils";

interface Tool {
    title: string,
    description: string,
    link: string,
    tags: string[],
}

interface ToolResponse {
    tools: Tool[],
}


interface pageProps {
}

const toolDataURL: string = getBaseURL() + "/data/tools.yaml"


const page: FC<pageProps> = ({}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [toolList, setToolList] = useState<Tool[]>([]);
    const [searchString, setSearchString] = useState<string>("");
    const [searchedToolList, setSearchedToolList] = useState<Tool[]>([]);

    useEffect(() => {
        console.log(toolDataURL);
        setLoading(true);
        fetch(toolDataURL)
            .then(response => response.text())
            .then(data => {
                const toolDataResponse = yaml.load(data) as ToolResponse;
                console.log(toolDataResponse);
                setToolList(toolDataResponse.tools);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        console.log(searchString);

        if (toolList.length === 0 || searchString === "") {
            setSearchedToolList(toolList);
            return;
        }

        const searchKeys: string[] = [];
        searchString.split(",").forEach((searchTerm) => {
            if (searchTerm === "") {
                return;
            }
            searchKeys.push(searchTerm.trim());
        });
        console.log(searchKeys);

        const newSearchedToolList: Tool[] = toolList.filter(tool => {
            return searchKeys.every(searchKey => {
                return tool.title.toLowerCase().includes(searchKey)
                    || tool.description.toLowerCase().includes(searchKey)
                    || tool.tags.join(" ").toLowerCase().includes(searchKey);
            });
        });
        console.log(newSearchedToolList);
        setSearchedToolList(newSearchedToolList);
        setLoading(false);
    }, [toolList, searchString]);

    const onSearch = (event: React.FormEvent<HTMLInputElement>) => {
        const searchString: string = event.currentTarget.value.trim().toLowerCase();
        console.log(searchString);
        setSearchString(searchString);
    }

    const mainContent = loading ?
        <p className={"text-2xl sm:text-2xl md:text-3xl lg:text-4xl my-20"}>Loading ...</p> : <>
            <Input placeholder="Search anything, e.g. 'genetic tool, ...'"
                   bordered={false}
                   className={"text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-center"}
                   onChange={onSearch}/>
            <Divider/>
            <div className={"flex-col"}>
                {searchedToolList.length === 0 && <p className={"text-2xl text-center"}>No results found.</p>}
                {searchedToolList.map((tool, index) => {
                    return <a key={tool.link}
                              href={tool.link}
                              target={"_blank"}
                              className={"w-full group rounded-lg border border-transparent px-5 py-4 transition-colors " +
                                  "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 " +
                                  "hover:dark:bg-neutral-800/30 block"}
                              rel="noopener noreferrer">
                        <h1 className={`mb-1 text-1xl font-semibold`}>
                            {tool.title}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                 -&gt;
                             </span>
                        </h1>
                        {/* description */}
                        <p className={"m-0 text-sm"}>
                            {tool.description}
                        </p>
                        <p className={`m-0 text-sm opacity-70`}>
                            {tool.tags.sort().map((tag, index) => {
                                return <span key={tag}
                                             className={"inline-block mr-1 px-2 py-1 rounded-md text-xs font-medium " +
                                                 "bg-gray-100 dark:bg-neutral-800/30"}
                                             style={{color: getTextColor(tag)}}>
                                    {tag}
                                </span>
                            })}
                        </p>
                    </a>
                })}
            </div>
            <FloatButton.Group shape="square" style={{right: 30}}>
                <FloatButton icon={<HomeOutlined/>}
                             href={"/"}/>
                <FloatButton icon={<GithubOutlined/>}
                             href={"https://github.com/IEEE-ITSS-OpenHub/awesome-scenario-engineering"}
                             target={"_blank"}/>
                <FloatButton.BackTop visibilityHeight={0}/>
            </FloatButton.Group>
        </>

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className={"text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white"}>
                Tools for Scenario Engineering
            </h1>
            <Divider/>
            {mainContent}
        </main>
    );
}

export default page;