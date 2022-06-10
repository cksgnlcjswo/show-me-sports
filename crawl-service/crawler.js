import axios from 'axios';
import * as cheerio from 'cheerio';
import express from 'express';

const router = express.Router();

const getHTML = async (uri) => {
    uri = encodeURI(uri);
    try {
        return axios.get(`https://sports.news.naver.com/kbaseball/schedule/index`);
    } catch(err) {
        console.log(err);
    }
}

const getData = async(keyword) => {
    
    let teamInfo = [];

    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    
    const featuredLeftTeam = $(" .vs_lft");
    const featuredRightTeam = $(" .vs_rgt");

    for(let i=0; i < featuredLeftTeam.length;++i) {
        let team = $(featuredLeftTeam[i]).find(".vs_team > strong").text();
        let score = $(featuredLeftTeam[i]).find(".vs_num").text();
        
        //공백문자 지우기
        score.replace(/(\r\n|\n|\r)/gm, "");
        team.replace(/(\r\n|\n|\r)/gm, "");
        teamInfo.push({team:team,score:score});
    }

    for(let i=0; i < featuredRightTeam.length;++i) {
        let team = $(featuredRightTeam[i]).find(".vs_team > strong").text();
        let score = $(featuredRightTeam[i]).find(".vs_num").text();
        
        //공백문자 지우기
        score.replace(/(\r\n|\n|\r)/gm, "");
        team.replace(/(\r\n|\n|\r)/gm, "");
        teamInfo.push({team:team,score:score});
    }
    
    console.log("teamInfo: ",teamInfo);
    return teamInfo;
}

router.get('/', (req,res) => {
    res.send("hellw wolrd!");
});

router.get('/health_check', (req,res) => {
    res.send("status good");
});

router.get('/sport-results',async (req,res) => {
    const uri = "https://sports.news.naver.com/kbaseball/schedule/index";
    const ret =await getData(uri);
    res.status(200).json(ret);
});

export default router;