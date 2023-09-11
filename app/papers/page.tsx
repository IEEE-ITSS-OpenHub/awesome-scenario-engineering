/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import {FC, useEffect, useState} from 'react';
import React from 'react';
import yaml from 'js-yaml';
import {getBaseURL} from "@/common/url.utils";
import {Divider, Input, FloatButton} from 'antd';
import {GithubOutlined, HomeOutlined} from "@ant-design/icons";
import {getTextColor} from "@/common/color.utils";

interface Paper {
    title: string,
    authors: string,
    tags: string[],
    link: string,
    venue: string,
    year: number,
}

interface PaperResponse {
    papers: Paper[],
}


interface pageProps {
}

const paperDataURL: string = getBaseURL() + "/data/papers.yaml"


const page: FC<pageProps> = ({}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [paperList, setPaperList] = useState<Paper[]>([]);
    const [searchString, setSearchString] = useState<string>("");
    const [searchedPaperList, setSearchedPaperList] = useState<Paper[]>([]);

    useEffect(() => {
        console.log(paperDataURL);
        setLoading(true);
        fetch(paperDataURL)
            .then(response => response.text())
            .then(data => {
                const paperDataResponse = yaml.load(data) as PaperResponse;
                console.log(paperDataResponse);
                setPaperList(paperDataResponse.papers);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        console.log(searchString);

        if (paperList.length === 0 || searchString === "") {
            setSearchedPaperList(paperList);
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

        const searchedPaperList: Paper[] = paperList.filter(paper => {
            return searchKeys.every(searchKey => {
                return paper.title.toLowerCase().includes(searchKey)
                    || paper.tags.join(" ").toLowerCase().includes(searchKey)
                    || paper.authors.toLowerCase().includes(searchKey)
                    || paper.venue.toLowerCase().includes(searchKey)
                    || paper.year.toString().includes(searchKey);
            });
        });
        console.log(searchedPaperList);
        setSearchedPaperList(searchedPaperList);
        setLoading(false);
    }, [paperList, searchString]);

    const onSearch = (event: React.FormEvent<HTMLInputElement>) => {
        const searchString: string = event.currentTarget.value.trim().toLowerCase();
        console.log(searchString);
        setSearchString(searchString);
    }

    const mainContent = loading ?
        <p className={"text-2xl sm:text-2xl md:text-3xl lg:text-4xl my-20"}>Loading ...</p> : <>
            <Input placeholder="Search anything, e.g. 'survey, coverage, 2023...'"
                   bordered={false}
                   className={"text-2xl sm:text-2xl md:text-2xl lg:text-3xl text-center"}
                   onChange={onSearch}/>
            <Divider/>
            <div className={"flex-col"}>
                {searchedPaperList.length === 0 && <p className={"text-2xl text-center"}>No results found.</p>}
                {searchedPaperList.map((paper, index) => {
                    return <a key={paper.title}
                              href={paper.link}
                              target={"_blank"}
                              className={"w-full group rounded-lg border border-transparent px-5 py-4 transition-colors " +
                                  "hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 " +
                                  "hover:dark:bg-neutral-800/30 block"}
                              rel="noopener noreferrer">
                        <p className={"text-sm opacity-50"}>
                            {paper.year} {paper.venue}
                        </p>
                        <h1 className={`mb-1 text-1xl font-semibold`}>
                            {paper.title}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                 -&gt;
                             </span>
                        </h1>
                        <p className={"m-0 text-sm"}>
                            {paper.authors}
                        </p>
                        <p className={`m-0 text-sm opacity-70`}>
                            {paper.tags.sort().map((tag, index) => {
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
                Papers on Scenario Engineering
            </h1>
            <Divider/>
            {mainContent}
        </main>
    );
}

export default page;