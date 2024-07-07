/*  Description: WebSocket communication
*   Author: Manuel Ziel
*   Last Update: 2024/07/07
*/

class WebSocketConnection {
    constructor(url) {
        this.url = url;
        this.webSocketConnection = null;
    }

    // Open WebSocket connection
    openWebSocket() {
        try {
            this.webSocketConnection = new WebSocket(this.url);

            this.webSocketConnection.onopen = (event) => {
                console.log('WebSocket connection opened:', event);
            };

            this.webSocketConnection.onmessage = (event) => {
                console.log('Received message from server:', event.data);
            };

            this.webSocketConnection.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };

            this.webSocketConnection.onclose = (event) => {
                console.log('WebSocket connection closed:', event.code, event.reason);
            };
        } catch (error) {
            console.error('WebSocket Error:', error);
        }
    }

    // Check if WebSocket is connected
    isConnected() {
        return this.webSocketConnection.readyState === WebSocket.OPEN;
    }

    // Reopen WebSocket connection
    reopenWebSocket() {
        if (this.isConnected()) {
            //console.log('WebSocket is already open');
        } else {
            console.log('Reopening WebSocket connection...');
            this.openWebSocket();
        }
    }

    // Send message through WebSocket
    sendMessage(message) {
        try {
            if (this.webSocketConnection && this.webSocketConnection.readyState === WebSocket.OPEN) {
                this.webSocketConnection.send(message);
            } else {
                console.error('WebSocket is not open. ReadyState:', this.webSocketConnection.readyState);
            }
        } catch (error) {
            console.error('WebSocket Error:', error);
        }
    }

    // Close WebSocket connection
    closeWebSocket() {
        try {
            if (this.webSocketConnection) {
                this.webSocketConnection.close();
            }
        } catch (error) {
            console.error('WebSocket Error:', error);
        }
    }
}