import fetch from "node-fetch";
import fs from "fs"

const invokeUrl = "https://ai.api.nvidia.com/v1/genai/nvidia/consistory"

const headers = {
    "Authorization": "Bearer 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",
    "Accept": "application/json",
}

const payload = {
    "mode": "init",
    "subject_prompt": "an old woman wearing a dress",
    "subject_tokens": ["woman","dress"],
    "subject_seed": 43,
    "style_prompt": "A photo of",
    "scene_prompt1": "walking in the garden",
    "scene_prompt2": "feeding birds in the square",
    "negative_prompt": "",
    "cfg_scale": 5,
    "same_initial_noise": false
}

let response = await fetch(invokeUrl, {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json", ...headers }
});

if (response.status != 200) {
  let errBody = await (await response.blob()).text()
  throw "invocation failed with status " + response.status + " " + errBody
}
let response_body = await response.json()

let artifacts = response_body['artifacts']
for (var i=0; i < artifacts.length; i++){
    var buffer = Buffer.from(artifacts[i]["base64"], 'base64')
    fs.writeFileSync(`${i}.jpg`, buffer)
}
