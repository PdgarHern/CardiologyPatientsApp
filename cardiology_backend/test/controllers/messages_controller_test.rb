require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @message = messages(:one)
  end

  test "should get index" do
    get messages_url, as: :json
    assert_response :success
  end

  test "should create message" do
    assert_difference('Message.count') do
      post messages_url, params: { message: { chat_id: @message.chat_id, doctor_id: @message.doctor_id, patient_id: @message.patient_id, value: @message.value } }, as: :json
    end

    assert_response 201
  end

  test "should show message" do
    get message_url(@message), as: :json
    assert_response :success
  end

  test "should update message" do
    patch message_url(@message), params: { message: { chat_id: @message.chat_id, doctor_id: @message.doctor_id, patient_id: @message.patient_id, value: @message.value } }, as: :json
    assert_response 200
  end

  test "should destroy message" do
    assert_difference('Message.count', -1) do
      delete message_url(@message), as: :json
    end

    assert_response 204
  end
end
