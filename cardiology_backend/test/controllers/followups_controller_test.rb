require "test_helper"

class FollowupsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @followup = followups(:one)
  end

  test "should get index" do
    get followups_url, as: :json
    assert_response :success
  end

  test "should create followup" do
    assert_difference('Followup.count') do
      post followups_url, params: { followup: { endDate: @followup.endDate, startDate: @followup.startDate } }, as: :json
    end

    assert_response 201
  end

  test "should show followup" do
    get followup_url(@followup), as: :json
    assert_response :success
  end

  test "should update followup" do
    patch followup_url(@followup), params: { followup: { endDate: @followup.endDate, startDate: @followup.startDate } }, as: :json
    assert_response 200
  end

  test "should destroy followup" do
    assert_difference('Followup.count', -1) do
      delete followup_url(@followup), as: :json
    end

    assert_response 204
  end
end
