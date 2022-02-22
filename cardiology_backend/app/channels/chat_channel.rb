class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_channel = "channel.#{params[:channel_code]}"
    stream_from @chat_channel
  end

  def receive(data)
    puts "received something: #{data.to_json}"
    ActionCable.server.broadcast @chat_channel, "I received the info you gave me"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
