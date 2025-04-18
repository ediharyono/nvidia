import fetch from "node-fetch";

const invokeUrl = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl"

const headers = {
    "Authorization": "Bearer $API_KEY_REQUIRED_IF_EXECUTING_OUTSIDE_NGC",
    "Accept": "application/json",
}

const payload = {
  "text_prompts": [
      {
          "text": "mecca, hajj, shells, creatures, high detail, sharp focus, 4k",
          "weight": 1
      },
      {
          "text":  "" ,
          "weight": -1
      }
  ],
  "cfg_scale": 5,
  "sampler": "K_DPM_2_ANCESTRAL",
  "seed": 0,
  "steps": 25
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
console.log(JSON.stringify(response_body))
