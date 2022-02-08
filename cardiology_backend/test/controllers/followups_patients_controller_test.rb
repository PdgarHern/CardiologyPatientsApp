require "test_helper"

class FollowupsPatientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @followups_patient = followups_patients(:one)
  end

  # test "should get index" do
  #   get followups_patients_url, as: :json
  #   assert_response :success
  # end

  # test "should create followups_patient" do
  #   assert_difference('FollowupsPatient.count') do
  #     post followups_patients_url, params: { followups_patient: { followup_id: @followups_patient.followup_id, patient_id: @followups_patient.patient_id } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show followups_patient" do
  #   get followups_patient_url(@followups_patient), as: :json
  #   assert_response :success
  # end

  # test "should update followups_patient" do
  #   patch followups_patient_url(@followups_patient), params: { followups_patient: { followup_id: @followups_patient.followup_id, patient_id: @followups_patient.patient_id } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy followups_patient" do
  #   assert_difference('FollowupsPatient.count', -1) do
  #     delete followups_patient_url(@followups_patient), as: :json
  #   end

  #   assert_response 204
  # end
end
