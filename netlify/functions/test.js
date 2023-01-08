// YOUR_BASE_DIRECTORY/netlify/functions/test-scheduled-function.js
const token = "5730954289:AAGDPIDwIyhae6aQwb7Y4T7_Gf6PrhyPd30";
const chatId = "404000198";

const { schedule } = require("@netlify/functions");

const handler = async function(event, context) {
    console.log("Received event:");
    sendMessage("schedule trigered");

    return {
        statusCode: 200,
    };
};

async function sendMessage(messages) {
 const message = encodeURIComponent(messages);
 const options = {
  hostname: "api.telegram.org",
  port: 443,
  path: `/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`,
  method: "POST",
 };
 const req = https.request(options, (res) => {
  //console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
   process.stdout.write(d);
  });
 });

 req.on("error", (error) => {
  console.error(error);
 });

 req.end();
}

exports.handler = schedule("* * * * *", handler);
