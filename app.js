// Use require instead of import
// TO:
import fetch from "node-fetch";
import fs from "fs"; // Use import for built-in modules too


const invokeUrl = "https://ai.api.nvidia.com/v1/genai/nvidia/consistory";

const headers = {
    "Authorization": "Bearer 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",
    "Accept": "application/json",
};

const payload = {
    "mode": "init",
    "subject_prompt": "superman",
    "subject_tokens": ["superman","sport wear"],
    "subject_seed": 43,
    "style_prompt": "A photo of",
    "scene_prompt1": "riding a bike in the street",
    "scene_prompt2": "riding a bike in the beach",
    "negative_prompt": "",
    "cfg_scale": 5,
    "same_initial_noise": false
};

// Wrap the main logic in an async function
async function main() {
    try {
        let response = await fetch(invokeUrl, {
            method: "post",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json", ...headers }
        });

        if (response.status != 200) {
          // Note: response.blob() might not be available directly in node-fetch CJS.
          // Use response.text() or response.buffer() instead if needed.
          let errBody = await response.text();
          throw "invocation failed with status " + response.status + " " + errBody;
        }
        let response_body = await response.json();

        let artifacts = response_body['artifacts'];
        for (var i=0; i < artifacts.length; i++){
            var buffer = Buffer.from(artifacts[i]["base64"], 'base64');
            fs.writeFileSync(`${i}.jpg`, buffer);
            console.log(`Saved ${i}.jpg`); // Added log for confirmation
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the async function
main();
