class FollowupsPatientsController < ApplicationController
  before_action :set_followups_patient, only: [:show, :update, :destroy]

  # GET /followups_patients
  def index
    @followups_patients = FollowupsPatient.all

    render json: @followups_patients
  end

  # GET /followups_patients/1
  def show
    render json: @followups_patient
  end

  # POST /followups_patients
  def create
    @followups_patient = FollowupsPatient.new(followups_patient_params)

    if @followups_patient.save
      render json: @followups_patient, status: :created, location: @followups_patient
    else
      render json: @followups_patient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /followups_patients/1
  def update
    if @followups_patient.update(followups_patient_params)
      render json: @followups_patient
    else
      render json: @followups_patient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followups_patients/1
  def destroy
    @followups_patient.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_followups_patient
      @followups_patient = FollowupsPatient.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def followups_patient_params
      params.require(:followups_patient).permit(:followup_id, :patient_id)
    end
end
