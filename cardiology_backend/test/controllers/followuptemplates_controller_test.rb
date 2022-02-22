require "test_helper"

class FollowuptemplatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @followuptemplate = followuptemplates(:one)
  end

  # test "should get index" do
  #   get followuptemplates_url, as: :json
  #   assert_response :success
  # end

  # test "should get last" do
  #   get followuptemplates_url, as: :json
  #   assert_response :success
  # end

  # test "should create followuptemplate" do
  #   assert_difference('Followuptemplate.count') do
  #     post followuptemplates_url, params: { followuptemplate: { hospital_id: @followuptemplate.hospital_id } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show followuptemplate" do
  #   get followuptemplate_url(@followuptemplate), as: :json
  #   assert_response :success
  # end

  # test "should update followuptemplate" do
  #   patch followuptemplate_url(@followuptemplate), params: { followuptemplate: { hospital_id: @followuptemplate.hospital_id } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy followuptemplate" do
  #   assert_difference('Followuptemplate.count', -1) do
  #     delete followuptemplate_url(@followuptemplate), as: :json
  #   end

  #   assert_response 204
  # end
end
