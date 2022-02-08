require "test_helper"

class FollowupsParametersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @followups_parameter = followups_parameters(:one)
  end

  # test "should get index" do
  #   get followups_parameters_url, as: :json
  #   assert_response :success
  # end

  # test "should create followups_parameter" do
  #   assert_difference('FollowupsParameter.count') do
  #     post followups_parameters_url, params: { followups_parameter: { followup_id: @followups_parameter.followup_id, parameter_id: @followups_parameter.parameter_id } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show followups_parameter" do
  #   get followups_parameter_url(@followups_parameter), as: :json
  #   assert_response :success
  # end

  # test "should update followups_parameter" do
  #   patch followups_parameter_url(@followups_parameter), params: { followups_parameter: { followup_id: @followups_parameter.followup_id, parameter_id: @followups_parameter.parameter_id } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy followups_parameter" do
  #   assert_difference('FollowupsParameter.count', -1) do
  #     delete followups_parameter_url(@followups_parameter), as: :json
  #   end

  #   assert_response 204
  # end
end
