require "test_helper"

class ParametersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @parameter = parameters(:one)
  end

  # test "should get index" do
  #   get parameters_url, as: :json
  #   assert_response :success
  # end

  # test "should create parameter" do
  #   assert_difference('Parameter.count') do
  #     post parameters_url, params: { parameter: { frequency: @parameter.frequency, name: @parameter.name, kind: @parameter.kind, hospital_id: @parameter.hospital_id } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show parameter" do
  #   get parameter_url(@parameter), as: :json
  #   assert_response :success
  # end

  # test "should update parameter" do
  #   patch parameter_url(@parameter), params: { parameter: { frequency: @parameter.frequency, name: @parameter.name, type: @parameter.kind } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy parameter" do
  #   assert_difference('Parameter.count', -1) do
  #     delete parameter_url(@parameter), as: :json
  #   end

  #   assert_response 204
  # end
end
