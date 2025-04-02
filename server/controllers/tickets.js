//const fetch = require('node-fetch');
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

export const testJira = async (req, res) => {
  axios
    .get(
      "https://luisalfredoreyes98.atlassian.net/rest/api/3/search?jql=project%20%3D%20testing",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${JIRA_EMAIL}:${JIRA_TOKEN}` // Use your Jira email and token here
          ).toString("base64")}`,
        },
      }
    )
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      res.status(200).json(response.data);
    })
    .catch((_) => {
      //console.log(error);
      res.status(500).json({ error: "Error fetching data from Jira" });
    });
};
