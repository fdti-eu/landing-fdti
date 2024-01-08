/** @type {import('houdini').ConfigFile} */
const config = {
    "plugins": {
        "houdini-svelte": {
            "client": "./src/client"
        } 
    },
    scalars: {
        json: {
            type: "object"
        },
        timestamptz: {
            type: "Date"
        },
        uuid: {
            type: "string"
        }
    }
}

export default config
