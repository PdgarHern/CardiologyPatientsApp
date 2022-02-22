import { createConsumer } from "@rails/actioncable";

export default class ActionCableManager {
  constructor () {
    this.consumer = createConsumer("ws://localhost:3000/chat");
    this.connection = null;
  }

  connectToChannel() {
    this.connection = this.consumer.subscriptions.create(
      {
        channel: "ChatChannel"
      }
    );

    this.connection.connected = () => {
      console.log("Connected");
    }

    this.connection.received = (data) => {
      console.log("I received this: ", data);
    }

    this.connection.disconnected = () => {
      console.log("The server closed the connection");
    }
  }

  closeConnection() {
    if (this.connection != null) {
      this.connection.unsubscribe();
      console.log("Disconnected from channel");
    } else {
      console.log("No channel");
    }
  }

  sendSomething(data) {
    if (this.connection != null) {
      let info = {
        info: data
      };

      this.connection.send(info);
    }
  }
}