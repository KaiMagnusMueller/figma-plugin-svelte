/**
 * Sends a message to the Figma plugin.
 *
 * @param {string} type - The type of the message. Will be used in the backend to determine how the message is handled.
 * @param {any} data - The data to be sent with the message.
 */
export function sendMsgToFigma(type, data = "") {
    parent.postMessage(
        {
            pluginMessage: {
                type: type,
                data: $state.snapshot(data),
            },
        },
        '*'
    );
}
