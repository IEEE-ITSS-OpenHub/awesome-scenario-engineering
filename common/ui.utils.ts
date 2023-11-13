import {getTextColor} from "@/common/color.utils";

const WORD_CLOUD_WIDTH = 1000;
const WORD_CLOUD_HEIGHT = 500;

export const TAG_CLOUD_SVG_ID = "tag-cloud-svg";

function draw(words: any[]) {
    const d3 = require("d3");

    d3.select("#" + TAG_CLOUD_SVG_ID)
        .attr("width", WORD_CLOUD_WIDTH)
        .attr("height", WORD_CLOUD_HEIGHT)
        .append("g")
        .attr("transform", "translate(" + WORD_CLOUD_WIDTH / 2 + "," + WORD_CLOUD_HEIGHT / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .text((d: any) => d.text)
        .style("font-size", function (d: any) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function (d: any, i: any) {
            // return fill(i);
            return getTextColor(d.text);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function (d: any) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d: any) {
            return d.text;
        });

}

function drawTextCloud(wordCountMap: Map<String, number>) {
    console.log(wordCountMap);
    const cloud = require("d3-cloud");

    const wordCountArray: any[] = []
    wordCountMap.forEach((value, key) => {
        wordCountArray.push({text: key, size: 10 + 5 * value + Math.log2(value)})
    })
    console.log(wordCountArray);
    const layout = cloud()
        .size([WORD_CLOUD_WIDTH, WORD_CLOUD_HEIGHT])
        .words(wordCountArray)
        .padding(5)
        .rotate(function () {
            return 0;
        })
        .font("Impact")
        .fontSize(function (d: any) {
            return d.size;
        })
        .on("end", draw);

    layout.start();
}

export default drawTextCloud
