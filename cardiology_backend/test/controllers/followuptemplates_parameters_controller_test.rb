require "test_helper"

class FollowuptemplatesParametersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @followuptemplates_parameter = followuptemplates_parameters(:one)
  end

  test "should get index" do
    get followuptemplates_parameters_url, as: :json
    assert_response :success
  end

  test "should create followuptemplates_parameter" do
    assert_difference('FollowuptemplatesParameter.count') do
      post followuptemplates_parameters_url, params: { followuptemplates_parameter: { followuptemplate_id: @followuptemplates_parameter.followuptemplate_id, parameter_id: @followuptemplates_parameter.parameter_id } }, as: :json
    end

    assert_response 201
  end

  test "should show followuptemplates_parameter" do
    get followuptemplates_parameter_url(@followuptemplates_parameter), as: :json
    assert_response :success
  end

  test "should update followuptemplates_parameter" do
    patch followuptemplates_parameter_url(@followuptemplates_parameter), params: { followuptemplates_parameter: { followuptemplate_id: @followuptemplates_parameter.followuptemplate_id, parameter_id: @followuptemplates_parameter.parameter_id } }, as: :json
    assert_response 200
  end

  test "should destroy followuptemplates_parameter" do
    assert_difference('FollowuptemplatesParameter.count', -1) do
      delete followuptemplates_parameter_url(@followuptemplates_parameter), as: :json
    end

    assert_response 204
  end
end
