require "test_helper"

class PatientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @patient = patients(:one)
    @user = users(:one)
  end

  # test "should get index" do
  #   get patients_url, as: :json
  #   assert_response :success
  # end

  # test "should create patient" do
  #   assert_difference('Patient.count') do
  #     post patients_url, params: { patient: { birthDate: @patient.birthDate, clinicRecord: @patient.clinicRecord, consentRGPD: @patient.consentRGPD, gender: @patient.gender, name: @patient.name, phoneNumber: @patient.phoneNumber, user_id: @patient.user_id } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show patient" do
  #   get patient_url(@patient), as: :json
  #   assert_response :success
  # end

  # test "should update patient" do
  #   patch patient_url(@patient), params: { patient: { birthDate: @patient.birthDate, clinicRecord: @patient.clinicRecord, consentRGPD: @patient.consentRGPD, gender: @patient.gender, name: @patient.name, phoneNumber: @patient.phoneNumber, user_id: @user.id } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy patient" do
  #   assert_difference('Patient.count', -1) do
  #     delete patient_url(@patient), as: :json
  #   end

  #   assert_response 204
  # end
end
